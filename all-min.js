var Add=function(t){function n(t){u=Util.posToCoord(t.pageX,t.pageY),startCoord=Util.posToCoord(h,d),p=!1;var n=new Particle(u.x,u.y);n.newMass(Math.PI*Math.pow(Math.pow(2,c),2)),n.speed=Util.distance(u.x,startCoord.x,u.y,startCoord.y)/10,n.angle=Math.atan2(startCoord.y-u.y,startCoord.x-u.x)+Math.PI/2}function e(t){p=!0,h=t.pageX,d=t.pageY}function i(){Universe.draw(),Universe.drawParticle(u.x,u.y,Math.pow(2,c),"#0000FF")}function s(t,n){Canvas.ctx.beginPath(),Canvas.ctx.moveTo(h,d),Canvas.ctx.lineTo(t,n),Canvas.ctx.stroke()}function a(t){u=Util.posToCoord(t.pageX,t.pageY),i(),p&&s(t.pageX,t.pageY)}function r(t){c+=t.wheelDeltaY/1e3,i()}function o(t){Input["btn-pause"].removeEventListener("click",o),Input.myCanvas.removeEventListener("mousedown",e),Input.myCanvas.removeEventListener("mouseup",n),Input.myCanvas.removeEventListener("mousemove",a),Input.myCanvas.removeEventListener("wheel",r),Scroll.init(),AnimLoop.drawFunction=Universe.draw}var u,c=2,p=!1,h=0,d=0;return t.init=function(){Scroll.stop(),AnimLoop.drawFunction=function(){},Input.hideElement("div-settings"),Input.showElement("btn-pause"),Input.myCanvas.addEventListener("mousedown",e),Input.myCanvas.addEventListener("mouseup",n),Input.myCanvas.addEventListener("mousemove",a),Input.myCanvas.addEventListener("wheel",r),Input["btn-pause"].addEventListener("click",o)},t}({}),AnimLoop=function(t){t.updateFunction=function(){},t.drawFunction=function(){},t.cycles=0;var n=0,e=48,i=0,s=0,a=0,r=17,o=30,u=0,c=function(p){if(null===window.requestAnimationFrame&&(p=(new Date).getTime()),n+1e3/e>p)return void(null!==window.requestAnimationFrame?requestAnimationFrame(c):setTimeout(c,1));i=p-n+u,n=p,p>s+1e3&&(o=.25*a+.75*o,s=p,a=0),a+=1;for(var h=0;i>=r;)if(t.cycles+=1,t.updateFunction(r),i-=r,++h>=240){i=0;break}u=isNaN(i)?0:i,t.drawFunction(),null!==window.requestAnimationFrame?requestAnimationFrame(c):setTimeout(c,1)};return t.start=function(){c()},t.stop=function(){},t.setSpeed=function(t){r=1e3/t},t}({}),Canvas=function(t){return t.c=document.getElementById("myCanvas"),t.ctx=t.c.getContext("2d"),t.c.width=window.innerWidth,t.c.height=window.innerHeight,t.width=t.c.width,t.height=t.c.height,t}({});window.addEventListener("load",function(){Spawn.particles(),Input.init()});var Input=function(t){function n(n){t[n]=document.getElementById(n)}return t.hideElement=function(t){Input[t].className="hidden"},t.showElement=function(t){Input[t].className=""},t.load=function(t){for(var e=0,i=t.length;i>e;e+=1)n(t[e])},t.init=function(){t.load(["btn-run","btn-add","div-settings","btn-pause","btn-clear","btn-reset","input-seed","input-speed","myCanvas"]),Scroll.init(),Settings.init()},t}({}),Md5=function(t){var n=n||function(t,n){var e={},i=e.lib={},s=function(){},a=i.Base={extend:function(t){s.prototype=this;var n=new s;return t&&n.mixIn(t),n.hasOwnProperty("init")||(n.init=function(){n.$super.init.apply(this,arguments)}),n.init.prototype=n,n.$super=this,n},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},r=i.WordArray=a.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=e!=n?e:4*t.length},toString:function(t){return(t||u).stringify(this)},concat:function(t){var n=this.words,e=t.words,i=this.sigBytes;if(t=t.sigBytes,this.clamp(),i%4)for(var s=0;t>s;s++)n[i+s>>>2]|=(e[s>>>2]>>>24-8*(s%4)&255)<<24-8*((i+s)%4);else if(65535<e.length)for(s=0;t>s;s+=4)n[i+s>>>2]=e[s>>>2];else n.push.apply(n,e);return this.sigBytes+=t,this},clamp:function(){var n=this.words,e=this.sigBytes;n[e>>>2]&=4294967295<<32-8*(e%4),n.length=t.ceil(e/4)},clone:function(){var t=a.clone.call(this);return t.words=this.words.slice(0),t},random:function(n){for(var e=[],i=0;n>i;i+=4)e.push(4294967296*t.random()|0);return new r.init(e,n)}}),o=e.enc={},u=o.Hex={stringify:function(t){var n=t.words;t=t.sigBytes;for(var e=[],i=0;t>i;i++){var s=n[i>>>2]>>>24-8*(i%4)&255;e.push((s>>>4).toString(16)),e.push((15&s).toString(16))}return e.join("")},parse:function(t){for(var n=t.length,e=[],i=0;n>i;i+=2)e[i>>>3]|=parseInt(t.substr(i,2),16)<<24-4*(i%8);return new r.init(e,n/2)}},c=o.Latin1={stringify:function(t){var n=t.words;t=t.sigBytes;for(var e=[],i=0;t>i;i++)e.push(String.fromCharCode(n[i>>>2]>>>24-8*(i%4)&255));return e.join("")},parse:function(t){for(var n=t.length,e=[],i=0;n>i;i++)e[i>>>2]|=(255&t.charCodeAt(i))<<24-8*(i%4);return new r.init(e,n)}},p=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(c.stringify(t)))}catch(n){throw Error("Malformed UTF-8 data")}},parse:function(t){return c.parse(unescape(encodeURIComponent(t)))}},h=i.BufferedBlockAlgorithm=a.extend({reset:function(){this._data=new r.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=p.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(n){var e=this._data,i=e.words,s=e.sigBytes,a=this.blockSize,o=s/(4*a),o=n?t.ceil(o):t.max((0|o)-this._minBufferSize,0);if(n=o*a,s=t.min(4*n,s),n){for(var u=0;n>u;u+=a)this._doProcessBlock(i,u);u=i.splice(0,n),e.sigBytes-=s}return new r.init(u,s)},clone:function(){var t=a.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0});i.Hasher=h.extend({cfg:a.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){h.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(t){return function(n,e){return new t.init(e).finalize(n)}},_createHmacHelper:function(t){return function(n,e){return new d.HMAC.init(t,e).finalize(n)}}});var d=e.algo={};return e}(Math);return function(t){function e(t,n,e,i,s,a,r){return t=t+(n&e|~n&i)+s+r,(t<<a|t>>>32-a)+n}function i(t,n,e,i,s,a,r){return t=t+(n&i|e&~i)+s+r,(t<<a|t>>>32-a)+n}function s(t,n,e,i,s,a,r){return t=t+(n^e^i)+s+r,(t<<a|t>>>32-a)+n}function a(t,n,e,i,s,a,r){return t=t+(e^(n|~i))+s+r,(t<<a|t>>>32-a)+n}for(var r=n,o=r.lib,u=o.WordArray,c=o.Hasher,o=r.algo,p=[],h=0;64>h;h++)p[h]=4294967296*t.abs(t.sin(h+1))|0;o=o.MD5=c.extend({_doReset:function(){this._hash=new u.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,n){for(var r=0;16>r;r++){var o=n+r,u=t[o];t[o]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}var r=this._hash.words,o=t[n+0],u=t[n+1],c=t[n+2],h=t[n+3],d=t[n+4],f=t[n+5],l=t[n+6],v=t[n+7],m=t[n+8],g=t[n+9],w=t[n+10],y=t[n+11],C=t[n+12],I=t[n+13],M=t[n+14],x=t[n+15],E=r[0],U=r[1],L=r[2],_=r[3],E=e(E,U,L,_,o,7,p[0]),_=e(_,E,U,L,u,12,p[1]),L=e(L,_,E,U,c,17,p[2]),U=e(U,L,_,E,h,22,p[3]),E=e(E,U,L,_,d,7,p[4]),_=e(_,E,U,L,f,12,p[5]),L=e(L,_,E,U,l,17,p[6]),U=e(U,L,_,E,v,22,p[7]),E=e(E,U,L,_,m,7,p[8]),_=e(_,E,U,L,g,12,p[9]),L=e(L,_,E,U,w,17,p[10]),U=e(U,L,_,E,y,22,p[11]),E=e(E,U,L,_,C,7,p[12]),_=e(_,E,U,L,I,12,p[13]),L=e(L,_,E,U,M,17,p[14]),U=e(U,L,_,E,x,22,p[15]),E=i(E,U,L,_,u,5,p[16]),_=i(_,E,U,L,l,9,p[17]),L=i(L,_,E,U,y,14,p[18]),U=i(U,L,_,E,o,20,p[19]),E=i(E,U,L,_,f,5,p[20]),_=i(_,E,U,L,w,9,p[21]),L=i(L,_,E,U,x,14,p[22]),U=i(U,L,_,E,d,20,p[23]),E=i(E,U,L,_,g,5,p[24]),_=i(_,E,U,L,M,9,p[25]),L=i(L,_,E,U,h,14,p[26]),U=i(U,L,_,E,m,20,p[27]),E=i(E,U,L,_,I,5,p[28]),_=i(_,E,U,L,c,9,p[29]),L=i(L,_,E,U,v,14,p[30]),U=i(U,L,_,E,C,20,p[31]),E=s(E,U,L,_,f,4,p[32]),_=s(_,E,U,L,m,11,p[33]),L=s(L,_,E,U,y,16,p[34]),U=s(U,L,_,E,M,23,p[35]),E=s(E,U,L,_,u,4,p[36]),_=s(_,E,U,L,d,11,p[37]),L=s(L,_,E,U,v,16,p[38]),U=s(U,L,_,E,w,23,p[39]),E=s(E,U,L,_,I,4,p[40]),_=s(_,E,U,L,o,11,p[41]),L=s(L,_,E,U,h,16,p[42]),U=s(U,L,_,E,l,23,p[43]),E=s(E,U,L,_,g,4,p[44]),_=s(_,E,U,L,C,11,p[45]),L=s(L,_,E,U,x,16,p[46]),U=s(U,L,_,E,c,23,p[47]),E=a(E,U,L,_,o,6,p[48]),_=a(_,E,U,L,v,10,p[49]),L=a(L,_,E,U,M,15,p[50]),U=a(U,L,_,E,f,21,p[51]),E=a(E,U,L,_,C,6,p[52]),_=a(_,E,U,L,h,10,p[53]),L=a(L,_,E,U,w,15,p[54]),U=a(U,L,_,E,u,21,p[55]),E=a(E,U,L,_,m,6,p[56]),_=a(_,E,U,L,x,10,p[57]),L=a(L,_,E,U,l,15,p[58]),U=a(U,L,_,E,I,21,p[59]),E=a(E,U,L,_,d,6,p[60]),_=a(_,E,U,L,y,10,p[61]),L=a(L,_,E,U,c,15,p[62]),U=a(U,L,_,E,g,21,p[63]);r[0]=r[0]+E|0,r[1]=r[1]+U|0,r[2]=r[2]+L|0,r[3]=r[3]+_|0},_doFinalize:function(){var n=this._data,e=n.words,i=8*this._nDataBytes,s=8*n.sigBytes;e[s>>>5]|=128<<24-s%32;var a=t.floor(i/4294967296);for(e[(s+64>>>9<<4)+15]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8),e[(s+64>>>9<<4)+14]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),n.sigBytes=4*(e.length+1),this._process(),n=this._hash,e=n.words,i=0;4>i;i++)s=e[i],e[i]=16711935&(s<<8|s>>>24)|4278255360&(s<<24|s>>>8);return n},clone:function(){var t=c.clone.call(this);return t._hash=this._hash.clone(),t}}),r.MD5=c._createHelper(o),r.HmacMD5=c._createHmacHelper(o)}(Math),t.rand=function(t){return parseInt(n.MD5(t+""),16)/parseInt("ffffffffffffffffffffffffffffffff",16)},t.hash=function(t){return n.MD5(t)},t}({}),Particle=function(){function t(t,n){this.x=t,this.y=n,this.angle=0,this.speed=0,this.mass=1,this.radius=0,Universe.particles.push(this)}function n(t,n,e,i){var s=Math.sin(n)*t,a=Math.cos(n)*t,r=Math.sin(i)*e,o=Math.cos(i)*e,u=s+r,c=a+o;return{angle:Math.atan2(u,c),speed:Math.sqrt(Math.pow(u,2)+Math.pow(c,2))}}function e(t,e){var i=n(this.speed,this.angle,t,e);this.angle=i.angle,this.speed=i.speed}function i(t,e,i){var s=n(t*e,i,this.speed*this.mass,this.angle);this.angle=s.angle,this.speed=s.speed/(this.mass+e),this.newMass(this.mass+e)}function s(){var t=this;Universe.particles.forEach(function(n){var e=Math.sqrt(Math.pow(n.y-t.y,2)+Math.pow(n.x-t.x,2));e<n.radius+t.radius&&t.mass>=n.mass&&n!==t&&(i.call(t,n.speed,n.mass,n.angle),n.destroy())})}function a(){this.x+=Math.sin(this.angle)*this.speed,this.y+=-Math.cos(this.angle)*this.speed,this.isFocus&&(pos.x=this.x,pos.y=this.y)}return t.prototype.update=function(){a.call(this),s.call(this);var t=this;Universe.particles.forEach(function(n){if(n!==t){var i=Util.distance(n.x,t.x,n.y,t.y),s=t.mass*n.mass/Math.pow(i,2),a=s/t.mass,r=Math.atan2(n.y-t.y,n.x-t.x)+Math.PI/2;e.call(t,a,r)}})},t.prototype.newMass=function(t){this.mass=t,this.radius=Math.sqrt(t/Math.PI)},t.prototype.destroy=function(){Universe.particles.splice(Universe.particles.indexOf(this),1)},t}(),Scroll=function(t){function n(t){Universe.zoom+=t.wheelDeltaY/1e3}function e(t){p=!0,o=t.pageX,u=t.pageY}function i(t){p&&(Universe.pos.x-=(o-t.pageX)/Math.pow(2,Universe.zoom),Universe.pos.y-=(u-t.pageY)/Math.pow(2,Universe.zoom)),o=t.pageX,u=t.pageY}function s(t){p=!1}function a(t){t.preventDefault(),1===t.touches.length?(p=!0,o=t.touches[0].pageX,u=t.touches[0].pageY):c=Util.distance(t.touches[0].pageX,t.touches[1].pageX,t.touches[0].pageY,t.touches[1].pageY)}function r(t){if(t.preventDefault(),1===t.touches.length)Universe.pos.x-=(o-t.touches[0].pageX)/Math.pow(2,Universe.zoom),Universe.pos.y-=(u-t.touches[0].pageY)/Math.pow(2,Universe.zoom),o=t.touches[0].pageX,u=t.touches[0].pageY;else{var n=Util.distance(t.touches[0].pageX,t.touches[1].pageX,t.touches[0].pageY,t.touches[1].pageY);c-=n,Universe.zoom-=c/1e3,c=n}}var o=0,u=0,c=0,p=!1;return t.init=function(){Input.myCanvas.addEventListener("wheel",n),Input.myCanvas.addEventListener("mousedown",e),Input.myCanvas.addEventListener("mousemove",i),Input.myCanvas.addEventListener("mouseup",s),Input.myCanvas.addEventListener("touchstart",a),Input.myCanvas.addEventListener("touchmove",r)},t.stop=function(){Input.myCanvas.removeEventListener("wheel",n),Input.myCanvas.removeEventListener("mousedown",e),Input.myCanvas.removeEventListener("mousemove",i),Input.myCanvas.removeEventListener("mouseup",s),Input.myCanvas.removeEventListener("touchstart",a),Input.myCanvas.removeEventListener("touchmove",r)},t}({}),Settings=function(t){function n(){Input.hideElement("div-settings"),Input.showElement("btn-pause"),AnimLoop.setSpeed(Input["input-speed"].value),Universe.start()}function e(){Input.hideElement("btn-pause"),Input.showElement("div-settings"),Universe.pause()}function i(){Universe.restart()}function s(){Spawn.seed=Input["input-seed"].value,Universe.restart(),Spawn.particles()}return t.init=function(){Input["btn-run"].addEventListener("click",n),Input["btn-pause"].addEventListener("click",e),Input["btn-add"].addEventListener("click",Add.init),Input["btn-clear"].addEventListener("click",i),Input["btn-reset"].addEventListener("click",s),Input["input-seed"].addEventListener("keyup",s)},t}({}),Spawn=function(t){return t.seed="",t.particles=function(){for(var n=0;100>n;n+=1){var e=new Particle(5e3*Md5.rand(t.seed+n+"x")-2500,5e3*Md5.rand(t.seed+n+"y")-2500);e.newMass(1*Md5.rand(t.seed+"_"+n)+50)}Universe.start(),Universe.pause()},t}({}),Universe=function(t){function n(){Canvas.ctx.globalAlpha=1,Canvas.ctx.fillStyle="#FFFFFF",Canvas.ctx.fillRect(0,0,Canvas.width,Canvas.height),Canvas.ctx.fillStyle="#000000",Canvas.ctx.globalAlpha=1}return t.particles=[],t.zoom=1,t.pos={x:0,y:0},t.update=function(){t.particles.forEach(function(t){t.update()})},t.drawParticle=function(n,e,i,s){s=s||"#000000",Canvas.ctx.fillStyle=s,Canvas.ctx.beginPath(),Canvas.ctx.arc((n+t.pos.x)*Math.pow(2,t.zoom)+Canvas.width/2,(e+t.pos.y)*Math.pow(2,t.zoom)+Canvas.height/2,i*Math.pow(2,t.zoom),0,2*Math.PI),Canvas.ctx.fill()},t.draw=function(){n(),t.particles.forEach(function(n){t.drawParticle(n.x,n.y,n.radius)})},t.restart=function(){t.particles=[]},t.pause=function(){AnimLoop.updateFunction=function(){}},t.start=function(){AnimLoop.updateFunction=t.update,AnimLoop.drawFunction=t.draw,AnimLoop.start()},t}({}),Util=function(){var t=this;return t.degToRad=function(t){return t*(Math.PI/180)},t.radToDeg=function(t){return t*(180/Math.PI)},t.distance=function(t,n,e,i){return Math.sqrt(Math.pow(t-n,2)+Math.pow(e-i,2))},t.posToCoord=function(t,n){return{x:(t-Canvas.width/2)/Math.pow(2,Universe.zoom)-Universe.pos.x,y:(n-Canvas.height/2)/Math.pow(2,Universe.zoom)-Universe.pos.y}},t}();