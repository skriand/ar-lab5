import React from "react";
import { useState, useEffect } from "react";
import { Cube16Regular, Delete16Regular } from "@fluentui/react-icons";
import {
  Button,
  Card,
  CardFooter,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Label,
  Input,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    ...shorthands.gap("10px"),
  },
  input: {
    minWidth: 0,
  },
  lable: {
    display: "flex",
    alignItems: "center",
  },
  card: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(41, 41, 41, 0.7)",
    left: "10px",
    right: "10px",
    bottom: "10px",
    position: "fixed",
    width: "calc(100vw - 20px)",
    zIndex: 1,
  },
});

const LocationScene = () => {
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [near, setNear] = useState(100);
  const [far, setFar] = useState(500);
  const [places, setPlaces] = useState(
    JSON.parse(localStorage.places ? localStorage.places : null)
  );
  const styles = useStyles();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const onClick = () => {
    localStorage.setItem(
      "places",
      JSON.stringify([
        ...(places || []),
        { latitude: latitude, longitude: longitude },
      ])
    );
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    setPlaces(JSON.parse(localStorage.getItem("places")));
  };

  const onReset = () => {
    localStorage.removeItem("places");
    setPlaces(null);
  };

  return (
    <>
      <a-scene
        vr-mode-ui="enabled: false"
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
        renderer="antialias: true; alpha: true"
      >
        <a-camera
          gps-new-camera="gpsMinDistance: 5;"
          near={near}
          far={far}
        ></a-camera>
        {places?.map((entity, index) => {
          console.log(entity.latitude);
          return (
            <>
              <a-entity
                material="color: rgb(27, 94, 160)"
                geometry="primitive: box"
                gps-new-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude}`}
                scale="60 60 60"
                position="0 -70 0"
              ></a-entity>
              <a-text
                value={index + 1}
                look-at="[gps-new-camera]"
                scale="120 120 120"
                gps-new-entity-place={`latitude: ${entity.latitude}; longitude: ${entity.longitude}`}
              ></a-text>
            </>
          );
        })}
      </a-scene>
      <Card appearance="outline" className={styles.card}>
        <Dialog>
          <CardFooter>
            <Label className={styles.lable}>near: </Label>
            <Input
              className={styles.input}
              value={near}
              onChange={(e) => setNear(e.target.value)}
            />
            <Label className={styles.lable}>far: </Label>
            <Input
              className={styles.input}
              value={far}
              onChange={(e) => setFar(e.target.value)}
            />
            <DialogTrigger disableButtonEnhancement>
              <Button
                icon={<Cube16Regular />}
                appearance="primary"
                style={{ minWidth: "fit-content" }}
              >
                Add new box
              </Button>
            </DialogTrigger>
            <Button
              icon={<Delete16Regular />}
              style={{ minWidth: "fit-content" }}
              onClick={onReset}
            />
          </CardFooter>

          <DialogSurface>
            <DialogBody>
              <DialogTitle>Box place</DialogTitle>
              <DialogContent className={styles.root}>
                <Label>Latitude</Label>
                <Input
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                <Label>Longitude</Label>
                <Input
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary">Close</Button>
                </DialogTrigger>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="primary" onClick={onClick}>
                    Add
                  </Button>
                </DialogTrigger>
              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>
      </Card>
    </>
  );
};

export default LocationScene;
