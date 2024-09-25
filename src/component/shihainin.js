import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Fade,
  Grow,
  Drawer,
  Typography,
  Zoom,
  Link,
  Breadcrumbs,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  CardContent,
  FormControlLabel,
  Switch,
  Backdrop,
  Avatar,
  CardActionArea,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import CountUp from "react-countup";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import CakeIcon from "@material-ui/icons/Cake";
import GroupIcon from "@material-ui/icons/Group";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolIcon from "@material-ui/icons/PanTool";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import moment from "moment";

import { Share } from "react-twitter-widgets";

import { Fireworks } from "fireworks-js/dist/react";
import Swal from "sweetalert2";
import AOS from "aos";

import IRBio from "./ir/bio";

var pm = new Audio(
  "https://cdn.pixabay.com/download/audio/2022/03/14/audio_a791c6fdc8.mp3?filename=firework-show-short-64657.mp3"
);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const fwoptions = {
  speed: 3,
};

const fwstyle = {
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  position: "fixed",
  background: "transperent",
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  drawer: {
    width: window.innerWidth < 700 ? "85%" : 400,
    flexShrink: 0,
  },
  drawerPaper: {
    width: window.innerWidth < 700 ? "85%" : 400,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const hbdparse = [
  "May this special day bring you endless joy and tons of precious memories!",
  "Today is the birthday of the person who is spreading joy and positivity all around. May your birthday and your life be as wonderful as you are!",
  "Your birthday only comes once a year, so make sure this is the most memorable one ever and have a colorful day.",
  "Wishing you a wonderful day and all the most amazing things on your Big Day!",
];

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const Shihainin = ({ fet, kamio, setSec, triggerUpdate, width }) => {
  const classes = useStyles();
  const History = useHistory();
  const [arr, setArr] = React.useState([]);
  const [Loaded, setLoaded] = React.useState(false);
  const [change, setChange] = React.useState(false);
  const [birthday, setBirthday] = React.useState(false);
  const [follower, setFol] = React.useState(0);
  const [countstep, setCount] = React.useState(false);
  const [loadfollow, setFollow] = React.useState(true);

  const [play, onPlay] = React.useState(false);
  const [GEPoster, setGEPoster] = React.useState("");
  const [customback, setBack] = React.useState(false);

  const numberWithCommasx = (x) => {
    return parseInt(x).toLocaleString("en-US");
  };

  React.useEffect(() => {
    if (localStorage.getItem("customback") != null) {
      setBack(true);
    } else {
      setBack(false);
    }
  }, []);
  React.useEffect(() => {
    if (customback) {
      localStorage.setItem("customback", "");
    } else {
      localStorage.removeItem("customback");
    }
  }, [customback]);

  const fetchfollower = (name) => {
    setFollow(true);
    fetch(fet + "/tpop/getfollower?name=" + name, {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => {
        setFol(data.count);
        setFollow(false);
      })
      .catch(() => {
        setFol(-1);
        setFollow(false);
      });
  };

  const BirthdayCheck = (val) => {
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
        if (data.count > 0) {
          const arr = data.response;
          const i = arr.findIndex((x) => x.name == val);
          if (i > -1) {
            //navigator.vibrate(1000);
            setBirthday(true);
          }
        } else {
          setBirthday(false);
        }
      });
  };

  React.useEffect(() => {
    AOS.init({ duration: 1000 });
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    setSec("About Shihainin Info");
    if (moment().unix() < 1698627600) {
      return;
    }
    fetch(fet + "/cgm48/getshihainin", {
      method: "post",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response == "Not found this member in record.") {
          History.push("/");
        } else {
          fetchfollower(data.follower);
          const temp = [];
          temp.push(data.response);
          setArr(temp);
          setLoaded(true);
          BirthdayCheck(data.response.name);
        }
      })
      .catch(() => {
        setArr([]);
        setLoaded(true);
      });
  }, []);

  const remainEvent = (unixStart) => {
    let start = moment().unix(); // some random moment in time (in ms)
    const difference = unixStart * 1000 - start * 1000;

    // Calculate days
    const days =
      difference / (1000 * 60 * 60 * 24) >
      Math.floor(difference / (1000 * 60 * 60 * 24))
        ? Math.floor(difference / (1000 * 60 * 60 * 24))
        : Math.floor(difference / (1000 * 60 * 60 * 24)) - 1;

    // Get remaining milliseconds after removing days
    const remainingMilliseconds = difference % (1000 * 60 * 60 * 24);

    // Calculate hours
    const hours =
      remainingMilliseconds / (1000 * 60 * 60) >
      Math.floor(remainingMilliseconds / (1000 * 60 * 60))
        ? Math.floor(remainingMilliseconds / (1000 * 60 * 60))
        : Math.floor(remainingMilliseconds / (1000 * 60 * 60)) - 1;

    // Get remaining milliseconds after removing hours
    const remainingMinutes = remainingMilliseconds % (1000 * 60 * 60);

    // Calculate minutes
    const minutes =
      remainingMinutes / (1000 * 60) >
      Math.round(remainingMinutes / (1000 * 60))
        ? Math.round(remainingMinutes / (1000 * 60)) + 1
        : Math.round(remainingMinutes / (1000 * 60));
    // execution
    let f = days + " Day(s) " + hours + " Hour(s) " + minutes + " Minute(s) ";
    return f;
  };

  if (moment().unix() < 1698627600) {
    return (
      <Backdrop open={true} className="text-light">
        This feature is avaliable soon in{" "}
        {moment.unix(1698627600).local().format("DD MMMM YYYY HH:mm")}
      </Backdrop>
    );
  }

  return (
    <>
      <div className="pt-5 pb-2">
        <h3 className={width > 600 ? " ml-5" : " ml-3"}>{"Shihainin House"}</h3>
        <hr />
        {Loaded ? (
          <>
            {arr.length > 0 &&
              arr.map((item, i) => (
                <div>
                  <Fade in={play} timeout={{ enter: 300, exit: 500 }}>
                    <Fireworks options={fwoptions} style={fwstyle} />
                  </Fade>
                  <Card
                    className={
                      (width > 600 ? " m-5" : " m-3") + " pb-2 bnktheme row"
                    }
                    key={i}>
                    <div
                      className={
                        width > 1600 ? "col-md-3 mb-1" : "col-lg-3 mb-1"
                      }>
                      <Zoom
                        in={true}
                        timeout={600}
                        style={{ transitionDelay: 0 }}>
                        <div className="p-3 pt-5">
                          <Avatar
                            src={item.img}
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </Zoom>
                    </div>
                    <Fade
                      in={true}
                      timeout={1200}
                      style={{ transitionDelay: 600 }}>
                      <div className="col-md mt-5 mb-5">
                        <h4>
                          {item.fullnameEn[0]} {item.fullnameEn[1]} [{item.name}
                          ]
                        </h4>
                        {loadfollow ? (
                          <Skeleton />
                        ) : (
                          <>
                            {follower > -1 ? (
                              <Zoom in={true}>
                                <p>
                                  {countstep == false ? (
                                    <CountUp
                                      end={follower}
                                      onEnd={() => setCount(true)}
                                      duration={3}
                                    />
                                  ) : (
                                    numberWithCommasx(follower)
                                  )}{" "}
                                  followers on Instagram
                                </p>
                              </Zoom>
                            ) : (
                              <button
                                className="cur btn btn-info"
                                onClick={() => fetchfollower(GEPoster)}>
                                Something went wrong, please click here to
                                refresh page
                              </button>
                            )}
                          </>
                        )}
                        <hr />
                        <>
                          <h6>
                            <LocationOnIcon fontSize="small" /> {item.province}
                          </h6>
                          <h6>
                            <AccountCircleIcon fontSize="small" /> Assigned to
                            Shihainin since{" "}
                            {moment(item.starting)
                              .local()
                              .format("DD MMMM YYYY")}{" "}
                            [{remainEvent(moment(item.starting).unix())}]
                          </h6>
                          {birthday ? (
                            <h6>
                              <CakeIcon fontSize="small" /> Today is her
                              birthday! (
                              {new Date().getFullYear() -
                                new Date(item.birthday).getFullYear() +
                                " years old"}
                              )
                            </h6>
                          ) : (
                            <>
                              {moment(item.birthday).format("M") ==
                                new Date().getMonth() + 1 &&
                              parseInt(moment(item.birthday).format("D")) -
                                new Date().getDate() >
                                0 ? (
                                <h6>
                                  <CakeIcon fontSize="small" />{" "}
                                  {moment(item.birthday).format(
                                    "DD MMMM YYYY"
                                  ) +
                                    " (" +
                                    (parseInt(
                                      moment(item.birthday).format("D")
                                    ) -
                                      new Date().getDate()) +
                                    " day(s) to go)"}
                                </h6>
                              ) : (
                                <h6>
                                  <CakeIcon fontSize="small" />{" "}
                                  {moment(item.birthday).format("DD MMMM YYYY")}
                                </h6>
                              )}
                            </>
                          )}
                          <p>
                            <FavoriteIcon fontSize="small" />
                            &nbsp;
                            {item.favorite.length > 0
                              ? item.favorite.map((its, i) =>
                                  i == item.favorite.length - 1
                                    ? its
                                    : its + ", "
                                )
                              : "None"}
                          </p>
                          <p>
                            <NaturePeopleIcon fontSize="small" />
                            &nbsp;
                            {item.hobby.length > 0
                              ? item.hobby.map((its, i) =>
                                  i == item.hobby.length - 1 ? its : its + ", "
                                )
                              : "None"}
                          </p>
                          <>
                            Follow her:&nbsp;
                            <a
                              className="text-light"
                              href={item.follow[0]}
                              target="_blank">
                              <FacebookIcon />
                            </a>
                            <a
                              className="text-light"
                              href={item.follow[1]}
                              target="_blank">
                              <InstagramIcon />
                            </a>
                          </>
                        </>
                        <hr />
                        <br />
                      </div>
                    </Fade>
                  </Card>
                </div>
              ))}
          </>
        ) : (
          <Grow in={!Loaded} timeout={600}>
            <div>
              <Card
                className={
                  (width > 600 ? " m-5" : " m-3") + " pb-2 bnktheme row"
                }>
                <div
                  className={width > 1600 ? "col-md-4 mb-1" : "col-lg-4 mb-1"}>
                  <Skeleton height={530} />
                </div>
                <div className="col-md mt-5 mb-5">
                  <Skeleton />
                  <hr />
                  <>
                    <h6>
                      <LocationOnIcon fontSize="small" /> <Skeleton />
                    </h6>
                    <p>
                      <AccountCircleIcon fontSize="small" /> <Skeleton />
                    </p>
                    <h6>
                      <CakeIcon fontSize="small" /> <Skeleton />
                    </h6>
                    <p>
                      <FavoriteIcon fontSize="small" />
                      &nbsp;
                      <Skeleton />
                    </p>
                    <p>
                      <NaturePeopleIcon fontSize="small" />
                      &nbsp;
                      <Skeleton />
                    </p>
                    <>
                      <Skeleton />
                    </>
                  </>
                  <hr />
                  <Skeleton />
                </div>
              </Card>
            </div>
          </Grow>
        )}

        <Backdrop className={classes.backdrop} open={change}>
          <img
            src="https://d3hhrps04devi8.cloudfront.net/main/cgm-circular.svg"
            width="50px"
          />
        </Backdrop>
      </div>
    </>
  );
};

export default Shihainin;
