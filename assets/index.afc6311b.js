import{S as v,P as x,W as E,a as L,C as S,B as M,M as p,b as w,c as I,D as q,A as P,d as C,t as B,R as h,V as g}from"./vendor.7b91ab78.js";const O=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function a(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=a(t);fetch(t.href,o)}};O();const m=new v,d=new x(75,window.innerWidth/window.innerHeight,.1,1e3),r=new E({canvas:document.querySelector("#bg"),antialias:!0});r.shadowMap.enabled=!0;r.shadowMap.type=L;r.setPixelRatio(window.devicePixelRatio);r.setSize(window.innerWidth,window.innerHeight);d.position.setZ(30);m.background=new S(200239);const k=new M(10,10,10,10),F=new p({color:670140}),s=new w(k,F);s.castShadow=!0;s.receiveShadow=!1;s.cursor="pointer";m.add(s);const H=new I(300,300),j=new p({color:670140,side:q}),u=new w(H,j);u.castShadow=!1;u.receiveShadow=!0;m.add(u);u.rotation.set(1.57,0,0);u.position.set(0,-10,0);const A=new P(4210752);m.add(A);const c=new C(16777215,1,100,90);c.position.set(30,20,0);c.target=s;c.castShadow=!0;m.add(c);c.shadow.mapSize.width=2048;c.shadow.mapSize.height=2048;c.shadow.camera.near=.5;c.shadow.camera.far=500;window.addEventListener("resize",B(()=>{const n=window.innerWidth,e=window.innerHeight;d.aspect=n/e,d.updateProjectionMatrix(),r.setSize(n,e)},{trailing:!0}));let f=[s];const W=setInterval(function(){let n=document.getElementById("footer-text");n.outerHTML='<p id="footer-text" style="animation: bounce 1s forwards;">Click the cube to continue!</p>',setTimeout(()=>{document.getElementById("footer-text").removeAttribute("style")},1e3)},5e3);document.addEventListener("mousedown",z);document.addEventListener("mousemove",D);function z(n){console.log("click heard");var e=new h,a=new g;a.x=n.clientX/r.domElement.clientWidth*2-1,a.y=-(n.clientY/r.domElement.clientHeight)*2+1,e.setFromCamera(a,d),console.log("raycaster set");var i=e.intersectObjects(f);i.length>0&&(console.log("clicker called"),R(i[0].object))}function D(n){var e=new h,a=new g;a.x=n.clientX/r.domElement.clientWidth*2-1,a.y=n.clientY/r.domElement.clientHeight*2+1,e.setFromCamera(a,d);var i=e.intersectObjects(f);i.length>0?document.body.style.cursor="pointer":document.body.style.cursor="default"}function R(n){f=[],clearInterval(W),document.getElementById("title").style.animation="fadeOutLeft 1s forwards",document.getElementById("subtitle").style.animation="fadeOutLeft 1s forwards 0.3s",document.getElementById("subtitle").style.animationFillMode="backwards",document.getElementById("bg").style.animation="fadeOut 1s forwards 1s 1 normal",document.getElementById("bg").style.animationFillMode="backwards",document.getElementById("footer").style.animation="fadeOut 1s forwards",document.getElementById("footer").style.animationFillMode="backwards",document.getElementById("secondPage").style.animation="fadeIn 1s forwards 3s",T()}function T(){let n=document.querySelector("#secondPage"),e=document.createElement("div");const a=document.createElement("section"),i=document.createElement("h1"),t=document.createTextNode("About Me");i.appendChild(t),a.appendChild(i);const o=document.createElement("img");o.src="./assets/me.jpg",o.classList.add("img-me");const l=document.createElement("p"),b=document.createTextNode("Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta molestias voluptatibus commodi ipsam, consectetur nemo temporibus magnam enim voluptatum, accusamus perferendis, quaerat laboriosam. Libero eos ab dignissimos dolorum? Animi tempore error provident, distinctio blanditiis repellat, fugit placeat, minima architecto consectetur laudantium. Est molestias eaque quas maiores corporis, ducimus, mollitia provident voluptatibus libero illum, earum delectus. Rem laborum vel in, dolore eos ut voluptates et harum impedit quis molestias, tempore consectetur facere dicta quod natus unde officiis itaque odit qui officia nobis error numquam! Deleniti impedit quae nulla amet fugiat explicabo nihil voluptatum enim sunt doloremque magnam ad, labore aperiam ullam!");l.appendChild(b),l.classList.add("text-me"),e.append(l),e.appendChild(o),e.classList.add("newdiv"),a.appendChild(e),n.appendChild(a)}function y(){requestAnimationFrame(y),s.rotation.x+=.003,s.rotation.y+=.003,s.rotation.z+=.003,d.position.set(27,7,-5),d.rotation.set(179.6,.9,90.7),r.render(m,d)}y();
