const CONTAINER = document.getElementById("buttons");

const makeConfig = (clip,onStateChange) => {
    return {
        height: '230',
        width: '150',
        videoId: clip.id,
        playerVars: {
            // autoplay: 1,         // Auto-play the video on load
            controls: 0,            // Show pause/play buttons in player
            showinfo: 0,            // Hide the video title
            modestbranding: 1,      // Hide the Youtube Logo
            fs: 1,                  // Hide the full screen button
            cc_load_policy: 0,      // Hide closed captions
            iv_load_policy: 3,      // Hide the Video Annotations
            rel:0,                  // Hide related videos
            showInfo:0,             
            start: clip.start,
            end: clip.end,
            autohide: 0              // Hide video controls when playing
        },
        events: {
            'onStateChange': onStateChange,
            'onPlayerReady': event => {
                event.target.setPlaybackQuality('small');
                event.target.setVolume(100);
            },
            'onPlaybackQualityChange': event => {
                const newq = event.target.getPlaybackQuality();
                console.log("new quality",newq);
                if(newq != "small"){
                    event.target.setPlaybackQuality('small');
                }
            }
        }
    }
}

const isEndState = state => state.data === YT.PlayerState.ENDED;
const isBufferState = state => state.data === YT.PlayerState.BUFFERING;
const makeDivID = clip => clip.id+"-"+clip.start+"-"+clip.end;
const randomByte = () => {
    const val = Math.floor((1-Math.pow(Math.random(),3))*256);
    if(val < 16){
        return "0"+val.toString(16)
    }
    return val.toString(16);
}
const makeRandomColor = () => {
    return "#"+randomByte()+randomByte()+randomByte();
}

const makePlayerForClip = clip => {

    /* Add Player to click on */
    const container = document.createElement("div");
    container.setAttribute("style","width:165;height:220;padding-bottom:15px; padding-left:15px;float:left;overflow:hidden;background-color:" + makeRandomColor())
    const el = document.createElement("div");
    el.setAttribute("id",makeDivID(clip));
    const label = document.createElement("h3");
    label.innerText = clip.label;
    el.appendChild(label);
    container.appendChild(label);
    container.appendChild(el);
    CONTAINER.appendChild(container);

    /* Set it up to reload properly after finishing playing */
    const onStateChange = state => {
        if (isEndState(state)) {
            player.pauseVideo();
            player.seekTo(clip.start);
        }
        if (isBufferState(state)) {
            player.setPlaybackQuality('small');
        }
    }
    
    /* make the player */
    const config = makeConfig(clip,onStateChange);
    const player = new YT.Player(makeDivID(clip), config);
    

}

const parseClip = str => {
    // https://www.youtube.com/v/ZChnW2oMfTY?start=61&end=62  "Yes."
    const regex = /\/v\/(.*)\?start=(\d*)&end=(\d*)\s+"?([^"]*)"?/;
    const results = str.match(regex);
    const id = results[1];
    const start = results[2];
    const end = results[3];
    const label = results[4];
    return {
        id:id,
        start:start,
        end:end,
        label:label
    }
}

var clips = [
    // Greetings
    'https://www.youtube.com/v/fIg3XmHWoT0?start=4&end=6  "Hey."',
    'https://www.youtube.com/v/fIg3XmHWoT0?start=124&end=125 "Hey!"',
    'https://www.youtube.com/v/fIg3XmHWoT0?start=149&end=152 "Bojack. Horseman, obviously"',  
    'https://www.youtube.com/v/pX-cplIttUU?start=101&end=106 "My name is bojack *hi* like you didn\'t know."',  
    // Affirmation
    'https://www.youtube.com/v/ZChnW2oMfTY?start=61&end=62  "Yes."',
    'https://www.youtube.com/v/ak9QV2Zu7CU?start=21&end=22  "Yes"',
    'https://www.youtube.com/v/1zszD_-xM2w?start=23&end=24  "Yes, thank you"',
    // Drinking
    'https://www.youtube.com/v/QWbFuALLIDA?start=40&end=45  "Let\'s get you liquored up"',
    'https://www.youtube.com/v/ZChnW2oMfTY?start=32&end=33  "I\'m incredibly drunk."',
    'https://www.youtube.com/v/ZChnW2oMfTY?start=57&end=61  "It takes a lot to get me drunk"',
    'https://www.youtube.com/v/pX-cplIttUU?start=79&end=81 "You call yourself drunks?"',
    'https://www.youtube.com/v/9IBWPO-Xxg0?start=41&end=43   "You wanna grab a cup of vodka?"',
    // Apologies
    'https://www.youtube.com/v/ak9QV2Zu7CU?start=22&end=23  "I\'m sorry."',
    'https://www.youtube.com/v/Jxw1PVdFVso?start=11&end=13  "I\'m sorry for everything"',
    'https://www.youtube.com/v/ak9QV2Zu7CU?start=26&end=27  "I said I\'m sorry."',
    'https://www.youtube.com/v/mv92InpX5cU?start=101&end=102 "I don\'t know"',
    // Exits
    'https://www.youtube.com/v/ak9QV2Zu7CU?start=153&end=156 "I don\'t know why I came here."',
    'https://www.youtube.com/v/ak9QV2Zu7CU?start=221&end=226 "OMINOUS STRUM"',
    'https://www.youtube.com/v/Qr6o5uDjBRI?start=219&end=261 "END THEME"',
    'https://www.youtube.com/v/wOg6aDK0uWQ?start=0&end=54    "OPENING CREDITS"',
    
    
    
]
clips = clips.map(parseClip);

function onYouTubePlayerAPIReady() {
    clips.forEach(clip=>makePlayerForClip(clip))
}

