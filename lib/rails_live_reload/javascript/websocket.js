/*!
  Rails Live Reload 0.2.0
  Copyright © 2022 RailsJazz
  https://railsjazz.com
 */
var RailsLiveReload=function(){"use strict";const t="RELOAD",e=["rails-live-reload-v1-json"];class n{static _instance;static get instance(){return n._instance||(n._instance=new this),n._instance}static start(){this.instance.start()}constructor(){this.initialize(),document.addEventListener("turbo:render",(()=>{document.documentElement.hasAttribute("data-turbo-preview")||this.restart()})),document.addEventListener("turbolinks:render",(()=>{document.documentElement.hasAttribute("data-turbolinks-preview")||this.restart()}))}initialize(){const{files:t,time:e,url:n}=JSON.parse(this.optionsNode.textContent);this.files=t,this.time=e,this.url=n}fullReload(){window.location.reload()}get optionsNode(){const t=document.getElementById("rails-live-reload-options");if(!t)throw"Unable to find RailsLiveReload options";return t}start(){this.connection||(this.connection=new WebSocket(function(t){if("function"==typeof t&&(t=t()),t&&!/^wss?:/i.test(t)){const e=document.createElement("a");return e.href=t,e.href=e.href,e.protocol=e.protocol.replace("http","ws"),e.href}return t}(this.url),e),this.connection.onmessage=this.handleMessage.bind(this),this.connection.onopen=this.handleConnectionOpen.bind(this),this.connection.onclose=this.handleConnectionClosed.bind(this))}stop(){this.connection.close()}restart(){this.initialize(),this.setupConnection()}setupConnection(){this.connection.send(JSON.stringify({event:"setup",options:{files:this.files,dt:this.time}}))}handleConnectionOpen(t){this.retriesCount=0,this.setupConnection()}handleMessage(e){JSON.parse(e.data).command===t&&this.fullReload()}handleConnectionClosed(t){this.connection=void 0,!t.wasClean&&this.retriesCount<=10&&(this.retriesCount++,setTimeout((()=>{this.start()}),1e3*this.retriesCount))}}return document.addEventListener("DOMContentLoaded",(()=>{n.start()})),n}();