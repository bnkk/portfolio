import{S as b,P as v,W as x,a as E,C as S,B as M,M as w,b as h,c as L,D as I,A as B,d as O,t as P,R as y,V as g}from"./vendor.7b91ab78.js";const C=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const u of a.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerpolicy&&(a.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?a.credentials="include":t.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}};C();const l=new b,d=new v(75,window.innerWidth/window.innerHeight,.1,1e3),r=new x({canvas:document.querySelector("#bg"),antialias:!0});r.shadowMap.enabled=!0;r.shadowMap.type=E;r.setPixelRatio(window.devicePixelRatio);r.setSize(window.innerWidth,window.innerHeight);d.position.setZ(30);l.background=new S(200239);const k=new M(10,10,10,10),F=new w({color:670140}),s=new h(k,F);s.castShadow=!0;s.receiveShadow=!1;s.cursor="pointer";l.add(s);const H=new L(300,300),W=new w({color:670140,side:I}),m=new h(H,W);m.castShadow=!1;m.receiveShadow=!0;l.add(m);m.rotation.set(1.57,0,0);m.position.set(0,-10,0);const j=new B(4210752);l.add(j);const c=new O(16777215,1,100,90);c.position.set(30,20,0);c.target=s;c.castShadow=!0;l.add(c);c.shadow.mapSize.width=2048;c.shadow.mapSize.height=2048;c.shadow.camera.near=.5;c.shadow.camera.far=500;window.addEventListener("resize",P(()=>{const n=window.innerWidth,e=window.innerHeight;d.aspect=n/e,d.updateProjectionMatrix(),r.setSize(n,e)},{trailing:!0}));let f=[s];const z=setInterval(function(){let n=document.getElementById("footer-text");n.outerHTML='<p id="footer-text" style="animation: bounce 1s forwards;">Click the cube to continue!</p>',setTimeout(()=>{document.getElementById("footer-text").removeAttribute("style")},1e3)},5e3);document.addEventListener("mousedown",A);document.addEventListener("mousemove",G);function A(n){console.log("click heard");var e=new y,o=new g;o.x=n.clientX/r.domElement.clientWidth*2-1,o.y=-(n.clientY/r.domElement.clientHeight)*2+1,e.setFromCamera(o,d),console.log("raycaster set");var i=e.intersectObjects(f);i.length>0&&(console.log("clicker called"),R(i[0].object))}function G(n){var e=new y,o=new g;o.x=n.clientX/r.domElement.clientWidth*2-1,o.y=n.clientY/r.domElement.clientHeight*2+1,e.setFromCamera(o,d);var i=e.intersectObjects(f);i.length>0?document.body.style.cursor="pointer":document.body.style.cursor="default"}function R(n){f=[],clearInterval(z),document.getElementById("title").style.animation="fadeOutLeft 1s forwards",document.getElementById("subtitle").style.animation="fadeOutLeft 1s forwards 0.3s",document.getElementById("subtitle").style.animationFillMode="backwards",document.getElementById("bg").style.animation="fadeOut 1s forwards 1s 1 normal",document.getElementById("bg").style.animationFillMode="backwards",document.getElementById("footer").style.animation="fadeOut 1s forwards",document.getElementById("footer").style.animationFillMode="backwards",document.getElementById("secondPage").style.animation="fadeIn 1s forwards 3s",q()}function q(){let n=document.querySelector("#secondPage");const e=document.createElement("section"),o=document.createElement("h1"),i=document.createTextNode("About Me");o.appendChild(i),e.appendChild(o),n.appendChild(e)}function p(){requestAnimationFrame(p),s.rotation.x+=.003,s.rotation.y+=.003,s.rotation.z+=.003,d.position.set(27,7,-5),d.rotation.set(179.6,.9,90.7),r.render(l,d)}p();
