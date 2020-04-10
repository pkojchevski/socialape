import React, { Fragment } from "react";
import NoImg from "../assets/images/no-img.png";
import theme from "../util/theme";

//mui
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 100,
    padding: 10,
    borderRadius: "50%"
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.main,
    marginBottom: 7
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginBottom: 10
  },
  fullLine: {
    height: 15,
    width: "90%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  halfLine: {
    height: 15,
    width: "45%",
    marginBottom: 10,
    backgroundColor: "rgba(0,0,0,0.6)"
  }
});

const ScreamSkeleton = ({ classes }) => {
  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.image} image={NoImg} />
      <CardContent className={classes.content}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullLine} />
        <div className={classes.fullLine} />
        <div className={classes.halfLine} />
      </CardContent>
    </Card>
  ));
  return <Fragment>{content}</Fragment>;
};

export default withStyles(styles)(ScreamSkeleton);
