import React, { useRef, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { MeetProvider } from "./context/MeetContext";
// import MeetPage from "./pages/MeetPage";
// import StartupPage from "./pages/StartupPage";
// import ThankYou from "./pages/ThankYouPage";
import { JitsiMeeting } from "@jitsi/react-sdk";

// import "./styles/custom.css";
const DEFAULT_DOMAIN = "meet.jit.si";
const toolbarButton = [
  "camera",
  "chat",
  "closedcaptions",
  "desktop",
  "download",
  "embedmeeting",
  "etherpad",
  "feedback",
  "filmstrip",
  "fullscreen",
  "hangup",
  "help",
  "highlight",
  "invite",
  "linktosalesforce",
  "livestreaming",
  "microphone",
  "noisesuppression",
  "participants-pane",
  "profile",
  "recording",
  "security",
  "select-background",
  "settings",
  "shareaudio",
  "sharedvideo",
  "shortcuts",
  "stats",
  "tileview",
  "toggle-camera",
  "videoquality",
  "whiteboard",
];
const App = () => {
  const apiRef = useRef();
  const [hasJoined, setHasJoined] = useState(false);

  const handleApiReady = (apiObj) => {
    apiRef.current = apiObj;
    // apiRef.current.on("videoConferenceJoined", handleKnockingParticipant);
    apiRef.current.on("videoConferenceJoined", (data) => {
      if (data.id) {
        setHasJoined(true);
      }
    });
    apiRef.current.on("videoConferenceLeft", (data) => {
      setHasJoined(false);
      window.location.reload();
    });
  };
  return (
    <div>
      <JitsiMeeting
        domain={DEFAULT_DOMAIN}
        roomName="Becon House Technology Jitsi Demo"
        configOverwrite={{
          startWithAudioMuted: true,
          disableModeratorIndicator: true,
          startScreenSharing: true,
          enableEmailInStats: false,
          toolbarButtons: [...toolbarButton],
        }}
        interfaceConfigOverwrite={{
          DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        }}
        userInfo={{
          displayName: "BeconHouse Technology",
        }}
        onApiReady={(externalApi) => {
          handleApiReady(externalApi);
        }}
        getIFrameRef={(iframeRef) => {
          iframeRef.style.height = "500px";
        }}
      />
      {hasJoined && (
        <button
          style={{
            display: "flex",
            width: "max-content",
            margin: "10px auto",
            padding: "5px 10px",
            fontSize: "30px",
            background: "#42A8B3",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => apiRef.current.executeCommand("toggleRaiseHand")}
        >
          Toggle hand Raise Button
        </button>
      )}
    </div>
  );
};

export default App;
