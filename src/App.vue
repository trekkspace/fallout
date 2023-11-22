<template>
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <div class="terminal-btn close-btn"></div>
        <div class="terminal-btn minimize-btn"></div>
        <div class="terminal-btn maximize-btn"></div>
      </div>
      <span class="terminal-title">TERMINAL</span>
    </div>
    <div class="terminal-body" ref="terminalBody">
      <div class="terminal-content">
        <p v-for="(line, index) in terminalLines" :key="index" v-html="line"></p>
      </div>
      <input type="text" class="terminal-input" v-model="userInput" @keyup.enter="executeCommand" placeholder="Enter command...">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      terminalLines: ["Welcome to the yessirskiii.net", "Type your commands here..."],
      userInput: ''
    };
  },
  methods: {
    executeCommand() {
      this.terminalLines.push('User input: ' + this.userInput);
      // Here you can handle the entered command, e.g., execute commands, simulate output, etc.
      this.userInput = '';
      // Scroll to the bottom of the terminal
      this.$refs.terminalBody.scrollTop = this.$refs.terminalBody.scrollHeight;
    }
  }
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  background-color: #000;
  color: #00FF00;
}

.terminal {
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

.terminal-title {
  margin-left: auto;
}

.terminal-body {
  padding: 10px;
  height: calc(100% - 30px);
  overflow-y: auto;
}

.terminal-input {
  width: calc(100% - 20px);
  padding: 5px;
  border: none;
  outline: none;
  background-color: transparent;
  color: #00FF00;
}

.terminal-input::placeholder {
  color: #00FF00;
  opacity: 0.5;
}

</style>
