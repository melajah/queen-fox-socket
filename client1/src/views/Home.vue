<template>
  <div class="home">
    <input type="text" v-model="name">
    <button @click="visit">visit</button>

  
      
    <ul>
      <li v-for="(msg, i) in messages" :key="i">
        {{ msg.message }} | {{ msg.name }}
      </li>
    </ul>


    <input type="text" v-model="message">
    <button @click="sendMsg">send msg</button>

    <br>
    <hr>
    {{visitor}}
  </div>
</template>

<script>
// @ is an alias to /src
import socket from "@/config/socket";

export default {
  name: 'Home',
  data() {
    return {
      name: "",
      visitor: [],
      message: "",
      messages: []
    }
  },
  // emit/ listener / broadcast
  methods: {
    sendMsg() {
      this.messages.push({
        name: this.name,
        message: this.message
      })
      socket.emit("send-message", {
        name: this.name,
        message: this.message
      });
    },
    visit() {
      // saya ingin memberi tahu ke server
      this.visitor.push(this.name)
      socket.emit("visit", this.name);

      socket.emit("send-message-private", {
        to: "seven",
        message: "hahahaha"
      })
    }
  },
  created() {
    socket.on("visit", (response) => {
      console.log("listening dari server dengan event visitor")
      this.visitor.push(response)
    })

    socket.on("new-message",  (response) => {
      this.messages.push(response)
    })

    if (localStorage.name) {
      socket.on(localStorage.name, function  (msg) {
        console.log(msg)
      })
    }
  }

}
</script>
