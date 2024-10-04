import React from "react";
import {
  Typography,
  ListItem,
  Zoom,
  ListItemText,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grow,
  Fade,
  CardHeader,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";
import AOS from "aos";

// const defaultTheme =
//   "https://i.scdn.co/image/ab67618600001016c2994cce3910cf0ef40d7653";
// const defaultvideo =
//   "https://www.youtube.com/embed/tvab7_OjBOw?autoplay=1&mute=1&controls=0&loop=1&playlist=tvab7_OjBOw";
const defaultTheme =
  "https://pbs.twimg.com/media/GYaDj7zaMAAxhFe?format=jpg&name=large";
const defaultvideo =
  "https://www.youtube.com/embed/uoQuu9NcnGU?autoplay=1&mute=1&controls=0&loop=1&playlist=uoQuu9NcnGU";
const HomeCom = ({ fet, kamin, gp, ImgThumb, stream, setSec, width }) => {
  const History = useHistory();
  const [Loaded1, setLoaded1] = React.useState(false);
  const [Loaded2, setLoaded2] = React.useState(false);
  const [Loaded3, setLoaded3] = React.useState(false);
  const [onMonth, setMonth] = React.useState(false);
  const [birth, setBirth] = React.useState([]);
  const [samplemem, setMem] = React.useState([]);
  const [highMV, setMV] = React.useState([]);
  const [GenRan, setGenRan] = React.useState(0);
  const [LIVEmem, setLivemem] = React.useState(null);
  const [memlist, setMemList] = React.useState([]);

  React.useEffect(() => {
    setSec("Homepage");
  }, []);

  React.useEffect(() => {
    if (kamin != "" && kamin != "-") {
      setLivemem(null);
      fetch(
        fet +
          "/cgm48/getmemberlivelist?i=" +
          JSON.parse(localStorage.getItem("loged")).user.uid.toString(),
        {
          method: "post",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLivemem(data);
        });
    } else {
      setLivemem([]);
    }
    fetch(
      fet +
        "/cgm48/memberlist?tstamp=" +
        Math.floor(new Date().getTime() / 1000),
      {
        method: "get",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setMemList(data.response);
      });
  }, [kamin]);

  function ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  React.useEffect(() => {
    AOS.init({ duration: 700 });
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    fetch(
      fet +
        "/cgm48/getmemberbybirth?tz=" +
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      {
        method: "post",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.count == 0) {
          setMonth(true);
          setBirth(
            data.monthList.sort(
              (a, b) =>
                parseInt(a.birthday.slice(5, 10).replace("-", "")) -
                parseInt(b.birthday.slice(5, 10).replace("-", ""))
            )
          );
          setLoaded1(true);
        } else {
          setBirth(data.response);
          setLoaded1(true);
        }
      });
    const ran = Math.floor(Math.random() * 2) + 1;
    fetch(
      fet +
        "/cgm48/getmemberby?filter=gen&param=" +
        ran +
        "&tstamp=" +
        Math.floor(new Date().getTime() / 1000),
      {
        method: "post",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setGenRan(ran);
        setMem(data.response);
        setLoaded2(true);
      });

    fetch(
      encodeURI(
        fet +
          "/cgm48/getVideo?tstamp=" +
          Math.floor(new Date().getTime() / 1000)
      ),
      {
        method: "post", // or 'PUT'
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoaded3(true);
        setMV(data.items);
        console.log("Success:", data);
      })
      .catch((error) => {
        setLoaded3(true);
        console.error("Error:", error);
      });
  }, []);

  const ChangeRoute = (name) => {
    History.push("/member/" + name.toLowerCase());
  };

  return (
    <>
      {width > 1100 && (
        <div class="video-background">
          {localStorage.getItem("lowgraphic") == null ? (
            <div class="video-foreground" data-aos="zoom-out-up">
              <iframe src={defaultvideo} frameborder="0"></iframe>
            </div>
          ) : (
            <div data-aos="zoom-out">
              <Fade in={true} timeout={900}>
                <img src={defaultTheme} width={width} />
              </Fade>
            </div>
          )}
        </div>
      )}
      {width > 1200 ? (
        <div className="cover mt-4">
          <Card data-aos="zoom-in" className="col-md-4 m-5">
            <CardContent>
              <Typography variant="h5" component="h2">
                Welcome to CGM48 Fan Space
              </Typography>
              <hr />
              <Typography color="textSecondary">
                This is your space for join with CGM48 fans around the world.
                Let's enjoy!
              </Typography>
              <hr />
              <Typography variant="body1" component="p">
                How do you do in this space?
                <ListItem>
                  <ListItemText primary="1. See current all members and view her profile." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Who are member born today. You can know. (Reference from local timezone)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. See fresh news about CGM48 here. (Powered by Google News)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. You can contact us to help promote favorite member's event without any cost." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Notes: Your donation and feedback is primary phase to help our online space work better." />
                </ListItem>
              </Typography>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="pb-5 pt-2">
          <Card data-aos="zoom-in" className="bnktheme ml-2 mr-2">
            <CardContent>
              <Typography variant="h5" component="h2">
                Welcome to CGM48 Fan Space
              </Typography>
              <hr />
              <Typography color="textSecondary">
                This is your space for join with CGM48 fans around the world.
                Let's enjoy!
              </Typography>
              <hr />
              <Typography variant="body1" component="p">
                How do you do in this space?
                <ListItem>
                  <ListItemText primary="1. See current all members and view her profile." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="2. Who are member born today. You can know. (Reference from local timezone)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="3. See fresh news about CGM48 here. (Powered by Google News)" />
                </ListItem>
                <ListItem>
                  <ListItemText primary="4. You can contact us to help promote favorite member's event without any cost." />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Notes: Your donation and feedback is primary phase to help our online space work better." />
                </ListItem>
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="stage text-center pt-5 pb-2">
        {Loaded3 ? (
          <>
            <d>
              {ImgThumb != "" && stream != null ? (
                <h3 className="mb-5" data-aos="fade-down">
                  Special Live Streaming
                </h3>
              ) : (
                <h3 className="mb-5" data-aos="fade-down">
                  Highlight Video Content or Music Video
                </h3>
              )}
            </d>
            <div
              className="row ml-3 mr-3 justify-content-center"
              data-aos="zoom-in">
              {highMV.length > 0 ? (
                <Zoom in={true} timeout={250}>
                  <div className="col-md-10 mb-5">
                    <Card>
                      {ImgThumb != "" ? (
                        <CardHeader
                          className="text-left"
                          title={
                            stream.livestatus == "live" ? (
                              <p className="form-inline">
                                <div class="circleload redload"></div>&nbsp;
                                {stream.title}
                              </p>
                            ) : (
                              stream.title
                            )
                          }
                          subheader={
                            "Streamed by " +
                            stream.uploader +
                            " since " +
                            moment
                              .utc(stream.start)
                              .local()
                              .format("DD MMMM YYYY HH:mm:ss") +
                            ". Click image thumbnail to watching Live"
                          }
                        />
                      ) : (
                        <CardHeader
                          className="text-left"
                          title={highMV[0].snippet.title}
                          subheader={
                            "Uploaded by " +
                            highMV[0].snippet.videoOwnerChannelTitle +
                            " since " +
                            moment
                              .utc(highMV[0].snippet.publishedAt)
                              .local()
                              .format("DD MMMM YYYY HH:mm:ss")
                          }
                        />
                      )}

                      {ImgThumb != "" ? (
                        <CardMedia
                          component="img"
                          onClick={() => History.push("/livestream")}
                          src={ImgThumb}
                        />
                      ) : (
                        <CardMedia
                          component="iframe"
                          height={600}
                          src={
                            "https://www.youtube.com/embed/" +
                            highMV[0].snippet.resourceId.videoId +
                            "?mute=1" +
                            (width <= 600 || gp == true ? "" : "&autoplay=1")
                          }
                          allowFullScreen
                        />
                      )}
                      <CardContent>
                        {ImgThumb != "" && stream != null && (
                          <Typography variant="subtitle1">
                            Notes: LSAT or LIVE Streaming Automated Trigger is
                            system flow to check live streaming status from
                            CGM48 Youtube Official is ready and display to
                            everyone without team managed in backend.
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </Zoom>
              ) : (
                <h6 data-aos="zoom-out">No Highlight MV.</h6>
              )}
            </div>
          </>
        ) : (
          <img
            src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg"
            width="50px"
            className="text-center"
          />
        )}
        <hr />
        {onMonth ? (
          <CardHeader
            className="mb-5"
            title={
              <h3 data-aos="flip-up">CGM48 Members Birthday on this month</h3>
            }
            subheader={moment().format("MMMM YYYY")}
          />
        ) : (
          <CardHeader
            className="mb-5"
            title={<h3 data-aos="flip-up">CGM48 Members Birthday in today</h3>}
            subheader={moment().format("DD MMMM YYYY")}
          />
        )}
        {Loaded1 ? (
          <div className="row ml-3 mr-3 justify-content-center">
            {birth.length > 0 ? (
              birth.map((item, i) => (
                <div
                  data-aos="zoom-in-down"
                  className="col-md-3 mb-5"
                  onClick={() => ChangeRoute(item.name)}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        src={item.img}
                        component="img"
                        className={item.graduated == true ? "grayimg" : ""}
                      />
                      <CardContent>
                        <h5>{item.name}</h5>
                        <p>
                          Birthday:{" "}
                          {moment(item.birthday).format("DD MMMM YYYY")} (
                          {moment(item.birthday).format("M") ==
                            new Date().getMonth() + 1 &&
                          parseInt(moment(item.birthday).format("D")) -
                            new Date().getDate() >
                            0
                            ? new Date().getFullYear() -
                              new Date(item.birthday).getFullYear() +
                              " years old | " +
                              (parseInt(moment(item.birthday).format("D")) -
                                new Date().getDate() ==
                              1
                                ? "in tomorrow"
                                : parseInt(moment(item.birthday).format("D")) -
                                  new Date().getDate() +
                                  " day(s) to go")
                            : moment(item.birthday).format("DD MMMM") ==
                              moment().format("DD MMMM")
                            ? "Happy " +
                              (new Date().getFullYear() -
                                new Date(item.birthday).getFullYear()) +
                              " years old!"
                            : new Date().getFullYear() -
                              new Date(item.birthday).getFullYear() +
                              " years old | already passed"}
                          )
                        </p>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))
            ) : (
              <h6 data-aos="zoom-out">No CGM48 member birthday in today.</h6>
            )}
          </div>
        ) : (
          <img
            src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg"
            width="50px"
            className="text-center"
          />
        )}
        <hr />
        {kamin != "" && kamin != "-" && (
          <>
            <CardHeader
              title={
                <h3 data-aos="flip-up">
                  Current CGM48 Members LIVE Streaming in IAM48 Application
                </h3>
              }
              className="mb-5"
            />
            {LIVEmem != null ? (
              <div className="row ml-3 mr-3 justify-content-center">
                {LIVEmem.length > 0 &&
                LIVEmem.filter((x) => x.isLive == true).length > 0 ? (
                  LIVEmem.map((item, i) => (
                    <div data-aos="zoom-in-down" className="col-md-3 mb-5">
                      <Card>
                        <CardActionArea
                          onClick={() =>
                            window.open(
                              "https://app.bnk48.com/member-live/" + item.link,
                              "_blank"
                            )
                          }>
                          <CardMedia
                            src={
                              memlist.filter(
                                (x) =>
                                  x.name.toLowerCase() ==
                                  item.member.toLowerCase()
                              ).length == 0
                                ? ""
                                : memlist.filter(
                                    (x) =>
                                      x.name.toLowerCase() ==
                                      item.member.toLowerCase()
                                  )[0].img
                            }
                            component="img"
                            className={item.graduated == true ? "grayimg" : ""}
                          />
                          <CardContent>
                            <h5>{item.member}</h5>
                            {moment().unix() >=
                            moment.utc(item.livestarted).unix() ? (
                              <small className="text-muted">
                                LIVE since{" "}
                                {moment
                                  .utc(item.livestarted)
                                  .local()
                                  .format("DD MMM YYYY HH:mm")}
                              </small>
                            ) : (
                              <small className="text-muted">
                                LIVE will started in{" "}
                                {moment
                                  .utc(item.livestarted)
                                  .local()
                                  .format("DD MMM YYYY HH:mm")}
                              </small>
                            )}
                            <p>{item.desc}</p>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </div>
                  ))
                ) : (
                  <h6>
                    No CGM48 member(s) LIVE right now. Please come back later.
                  </h6>
                )}
              </div>
            ) : (
              <div className="row ml-3 mr-3 justify-content-center">
                <img
                  src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg"
                  width="50px"
                  className="text-center"
                />
              </div>
            )}
          </>
        )}
        <hr />
        <CardHeader
          title={<h3 data-aos="flip-up">Sample Members</h3>}
          subheader={
            GenRan != 0 ? ordinal_suffix_of(GenRan) + " Generation" : ""
          }
          className="mb-5"
        />
        {Loaded2 ? (
          <div className="row ml-3 mr-3 justify-content-center">
            {samplemem.length > 0 ? (
              samplemem.map((item, i) => (
                <div
                  data-aos="zoom-in-down"
                  className="col-md-3 mb-5"
                  onClick={() => ChangeRoute(item.name)}>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        src={item.img}
                        component="img"
                        className={item.graduated == true ? "grayimg" : ""}
                      />
                      <CardContent>
                        <h5>{item.name}</h5>
                        {item.graduated == true && (
                          <p class="badge badge-pill badge-warning">
                            Graduating Announced
                          </p>
                        )}
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </div>
              ))
            ) : (
              <h6>No CGM48 member birthday in today.</h6>
            )}
          </div>
        ) : (
          <img
            src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg"
            width="50px"
            className="text-center"
          />
        )}
      </div>
    </>
  );
};

export default HomeCom;
