<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template @click="console.log('heu')">
  <div  class="fallout-terminal">
    <div class="terminal-header">
      <div @click="fucusInput" class="terminal-buttons">
        <div class="terminal-btn close-btn"></div>
        <div class="terminal-btn minimize-btn"></div>
        <div class="terminal-btn maximize-btn"></div>
      </div>
      <span class="terminal-title">YESSIRSKIII.net</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-content" ref="terminalContent">
        <div v-for="(line, index) in terminalLines" :key="index" class="terminal-line">
          <span v-html="highlightedText(line)"></span>
        </div>
        <div ref="terminalInput" class="terminal-input">
          <!-- <span class="caret" v-if="showCaret">█</span> -->
          <!-- <span v-if="!showCaret">&nbsp;</span>
           -->
          <!-- <input  ref="terminalType" type="text" v-on:blur="fucusInput" v-model="userInput" @input="handleInput" @keyup.enter="executeCommand" :disabled="disableInput" class="caret-block"> -->
          
          <span ref="terminalType"  @input="handleInput" @keyup.enter="executeCommand" id="input" contenteditable></span>
          <!-- <contenteditable ref="terminalType" :blur="fucusInput" tag="div" @input="handleInput" @keyup.enter="executeCommand" contenteditable v-model="userInput"  /> -->
                <span class="caret" v-if="showCaret">█</span>
                <span v-if="!showCaret">&nbsp;</span>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import typingSound1 from "@/assets/sound/key1.mp3";
import typingSound2 from "@/assets/sound/key2.mp3";
import typingSound3 from "@/assets/sound/key3.mp3";
import typingSound4 from "@/assets/sound/key4.mp3";
import buttonSound from "@/assets/sound/button.mp3"
import contenteditable from 'vue-contenteditable'; 

export default {
  data() {
    return {
      terminalLines: [
        { text: "Welcome to the YESSIRSKIII.net", highlights: [{ word: "YESSIRSKIII.net", color: "#ff0000" }] },
        { text: "Email us at contact@yessirskiii.net for for enquiries.", highlights: [{ word: "contact@yessirskiii.net", color: "#fa0000" }]},
        
        { text: "Type '/help' for available commands!", highlights: [{ word: "/help", color: "#ff0000" }]},
        
      ],
      userInput: "world",
      disableInput: false,
      showCaret: true,
      guessingGameStarted: false,
      secretNumber: null,
      attempts: 3,
      typingSounds: [
        new Audio(typingSound1),
        new Audio(typingSound2),
        new Audio(typingSound3),
        new Audio(typingSound4)
      ],
      buttonSound: new Audio(buttonSound)
    };
  },
  computed: {
    highlightedText() {
      return line => {
        if (!line.highlights || !Array.isArray(line.highlights)) {
          return line.text;
        }

        let highlightedText = line.text;
        line.highlights.forEach(highlight => {
          const regex = new RegExp(highlight.word, 'gi');
          const spanStyle = `color: ${highlight.color}; font-weight: bold;`; // Custom style based on selected color
          highlightedText = highlightedText.replace(regex, `<span style="${spanStyle}">$&</span>`);
        });
        return highlightedText;
      };
    },
  },
  methods: {
    handleInput() {
      const randomIndex = Math.floor(Math.random() * this.typingSounds.length);
      const selectedSound = this.typingSounds[randomIndex];
      
      selectedSound.currentTime = 0; // Reset sound to the beginning for immediate replay
      selectedSound.play();
    },
    showAvailableCommands() {
      if (this.userInput === '/') {
        this.showCommands = true;
      } else {
        this.showCommands = false;
      }
    },
    executeCommand() {
      console.log();
      this.userInput = this.$refs.terminalType.textContent
      this.$refs.terminalType.textContent = ''
      this.buttonSound.play()
      const command = this.userInput.trim();
      if (this.userInput.match(/^\d$/) && this.guessingGameStarted) {
        const guessedNumber = parseInt(this.userInput, 10);
        if (guessedNumber === this.secretNumber) {
          this.addTerminalLine({ text: `Congratulations! You guessed the correct number (${this.secretNumber}).` });
          this.guessingGameStarted = false;
          this.attempts = 3
        } else {
          this.attempts--;
          if (this.attempts > 0) {
            const hint = guessedNumber < this.secretNumber ? "higher" : "lower";
            this.addTerminalLine({ text: `Incorrect guess. Try a ${hint} number. Attempts left: ${this.attempts}` });
          } else {
            this.addTerminalLine({ text: `Out of attempts! The correct number was ${this.secretNumber}.` });
            this.guessingGameStarted = false;
            this.attempts = 3
          }
        }
      } else {


        switch (command) {
        case "/help":
          this.showAvailableCommands();
          break;
        case "/pass":
          this.generatePassword();
          break;
        case "/dbd":
          this.openDBDWebsite();
          break;
        case "/guess":
          this.startGuessingGame();
          break;

        case "/clear":
          this.clearConsole();
          break
        default:
          this.addTerminalLine({ text: "Command not recognized. Type '/help' for available commands." });
      }
      }
      

      this.userInput = "";
    },
    showAvailableCommands() {
      this.addTerminalLine({ text: "Available commands:" });
      this.addTerminalLine({ text: "/pass - Generate a random password", highlights: [{ word: "/pass", color: "#ff0000" }] });
      this.addTerminalLine({ text: "/dbd - Open dbd.yessirskiii.net website", highlights: [{ word: "/dbd", color: "#ff0000" }]});
      this.addTerminalLine({ text: "/guess - Start guessing game", highlights: [{ word: "/guess", color: "A25772" }] });
      
    },
    clearConsole(){
      this.terminalLines = [
        { text: "Welcome to the yessirskiii.net" },
        { text: "CLEARED! Type '/help' for available commands." }
      ]
    },
    generatePassword() {
      // Logic to generate a random password
      const password = Math.random().toString(36).substring(2, 10);
      this.addTerminalLine({ text: "Generated password: " + password });
    },
    openDBDWebsite() {
      window.open("https://dbd.yessirskiii.net", "_blank");
      this.addTerminalLine({ text: "Opened dbd.yessirskiii.net website" });
    },
    addTerminalLine(line) {
      this.terminalLines.push(line);
      this.$nextTick(() => {
        this.scrollTerminalToBottom();
      });
    },
    scrollTerminalToBottom() {
      const terminalContent = this.$refs.terminalContent;
      terminalContent.scrollTop = terminalContent.scrollHeight;
    },

    /// guesing game
    startGuessingGame() {
      this.guessingGameStarted = true;
      this.secretNumber = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
      this.addTerminalLine({ text: "Guess a number between 1 and 10. You have 3 attempts." });
    },


    //focus input
    fucusInput(){
      console.log(this.$refs.terminalType)
      this.$refs.terminalType.focus()
    }
  },
  mounted() {
    setInterval(() => {
      this.showCaret = !this.showCaret;
    }, 500);
    this.fucusInput()
    window.addEventListener('click', function(ev) {
        // self.myMethod(ev); // declared in your component methods
              console.log()
              this.document.querySelector("#input").focus()

    });
  },
  beforeDestroy() {
    // this.$refs.terminalType.removeEventListener('blur', this.focusInput);
  },
  
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Lobster&family=VT323&display=swap');

/* @font-face {
  font-family: 'VT323', monospace;
  src: url("@/assets/fonts/VT323-Regular.ttf") format(truetype);
} */
/* CSS styles for full-screen and mobile responsiveness */

.terminal-buttons {
  display: flex;
}

.terminal-btn {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}

.close-btn {
  background-color: #FF0000;
}

.minimize-btn {
  background-color: #FFD700;
}

.maximize-btn {
  background-color: #00FFFF;
}

.fallout-terminal {
  font-family: 'VT323';
  width: 100%;
  height: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background-color: #000;
}

.terminal-header {
  background-color: #00FF00;
  padding: 10px;
  display: flex;
  align-items: center;
}

.terminal-title {
  margin-left: auto;
  color: black;
}

.terminal-body {
  font-size: 1.5em;
  /* flex: 1; */
  /* display: flex; */
  /* flex-direction: column; */
  /* overflow-y: auto; */
  padding: .4em;
}

.terminal-content {
  /* flex: 1; */
  /* display: flex; */
  /* flex-direction: column; */
}

.terminal-input{
  display: flex;
  width: 1em;
}

.caret{
  /* position: absolute; */
  padding-top: .4em;
}

.terminal-input input{
  /* position: absolute;
  left: 1em;
  font-size: 1.5em;
  font-family: 'VT323';
 color: #00FF00;
 background: transparent;
 border: none;
 caret-color: transparent; */
}

input:focus{
  outline: none;
}


#input {
    position: relative;
    caret-color: transparent;
    
    padding-left: 1.5em;
    font-size: 1.4em;
    text-decoration: none;
}
/* Puts a blinking square after the content as replacement for caret */
#input[contenteditable="true"]:after {
    content: "■";
    animation: cursor 1s infinite;
    animation-timing-function: step-end;
    margin-left: 1px;
}
/* Inserts the > before terminal input */
#input:before {
    content: ">";
    position: absolute;
    padding-left: 1rem;
    left: 0;
}

#input:active{
  text-decoration: none;
}

/* Rest of your styles go here... */
</style>