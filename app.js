class DrumKit{
    constructor(){
        this.pads = document.querySelectorAll(".pad");
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./sounds/kick-classic.wav";
        this.currentSnare = "./sounds/snare-acoustic01.wav";
        this.currentHihat = "./sounds/hihat-acoustic01.wav";
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudio = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteAudio = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    
    activePad(){
        this.classList.toggle('active');
    }

    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`)
        //Loop over pads
        activeBars.forEach(bar =>{
            bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2';
            //Check if pads are active
            if(bar.classList.contains('active')){
                //checking for track class
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++; 
    }

    start(){
        const interval = (60/this.bpm)*1000;
        //check if its playing
        if(!this.isPlaying){
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        }else{
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    updateBtn(){ 
        if(this.isPlaying){
            this.playBtn.innerHTML = 'Stop'; 
            this.playBtn.classList.add('active');
        }else{
            this.playBtn.innerHTML = 'Play';
            this.playBtn.classList.remove('active');
        }
    }

    changeSound(e){
        const selectorName = e.target.name;
        const selectorValue = e.target.value;
        
        switch(selectorName){
            case 'kick-select':
                this.kickAudio.src = selectorValue;
                break;
        }
        switch(selectorName){
            case 'snare-select':
                this.snareAudio.src = selectorValue;
                break;
        }
        switch(selectorName){
            case 'hihat-select':
                this.hihatAudio.src = selectorValue;
                break;
        }
    }

    muteSound(e){
        const muteIndex = e.target.getAttribute('data-track');
        e.target.classList.toggle('active');
        
        if(e.target.classList.contains("active")){
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 0;
                    break;
            }
            switch(muteIndex){
                case '1':
                    this.snareAudio.volume = 0;
                    break;
            }
            switch(muteIndex){
                case '2':
                    this.hihatAudio.volume = 0;
                    break;
            }
        }else{
            switch(muteIndex){
                case '0':
                    this.kickAudio.volume = 1;
                    break;
            }
            switch(muteIndex){
                case '1':
                    this.snareAudio.volume = 1;
                    break;
            }
            switch(muteIndex){
                case '2':
                    this.hihatAudio.volume = 1;
                    break;
            } 
        }
    }
    
    changeTempo(e){
        const tempoText = document.querySelector(".tempo-nr");
        tempoText.innerHTML = ` ${e.target.value}`;
    }

    updateTempo(e){
        this.bpm = e.target.value;
        console.log(this.bpm);
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
}

//Event Listeners

const drumKit = new DrumKit();

//creating active pad
drumKit.pads.forEach(pad =>{
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function(){
        this.style.animation ="";
    });
});

//play
drumKit.playBtn.addEventListener('click', () =>{
    drumKit.start();
    drumKit.updateBtn();
});

//Changing Sounds

drumKit.selects.forEach(select =>{
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});

//Muting Sounds
drumKit.muteAudio.forEach(btn =>{
    btn.addEventListener('click', function(e){
        drumKit.muteSound(e);
    });
});

//Tempo
drumKit.tempoSlider.addEventListener('input', function(e){
    drumKit.changeTempo(e);
});
drumKit.tempoSlider.addEventListener('change', function(e){
    drumKit.updateTempo(e);
});