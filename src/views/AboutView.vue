<template>
  <div class="fallout-terminal">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <div class="terminal-btn close-btn"></div>
        <div class="terminal-btn minimize-btn"></div>
        <div class="terminal-btn maximize-btn"></div>
      </div>
      <span class="terminal-title">FALLOUT TERMINAL</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-content" ref="terminalContent">
        <div v-for="(line, index) in terminalLines" :key="index" class="terminal-line">
          <span v-html="line.text"></span>
        </div>
        <div ref="terminalInput" class="terminal-input">
          <span class="caret" v-if="showCaret">█</span>
          <span v-if="!showCaret">&nbsp;</span>
          <input type="text" v-model="userInput" @input="handleInput" @keyup.enter="executeCommand" :disabled="disableInput">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terminalLines: [
        { text: "Welcome to the Fallout Terminal!" },
        { text: "Type 'help' for available commands." }
      ],
      userInput: "",
      disableInput: false,
      showCaret: true
    };
  },
  methods: {
    handleInput() {
      // Logic for handling input, if needed
    },
    executeCommand() {
      if (this.userInput.trim() === "help") {
        this.addTerminalLine({ text: "Available commands: ..." }); // Add your help text here
      } else {
        this.addTerminalLine({ text: "Command not recognized. Type 'help' for available commands." });
      }
      this.userInput = "";
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
    }
  },
  mounted() {
    // Simulate blinking caret animation
    setInterval(() => {
      this.showCaret = !this.showCaret;
    }, 500);
  }
};
</script>

<style scoped>
/* Add your CSS styles here */

.fallout-terminal {
  width: 600px;
  height: 400px;
  border: 2px solid #00FF00;
  border-radius: 5px;
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
}

.terminal-header {
  background-color: #00FF00;
  padding: 5px;
  display: flex;
  align-items: center;
}

/* Rest of your styles go here... */
</style>
