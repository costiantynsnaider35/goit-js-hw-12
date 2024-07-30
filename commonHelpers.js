import{a as y,S as h,i as g}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const L="45139433-b39febc8ea292e87313288c36",v="https://pixabay.com/api/";async function p(s,t){const n=new URLSearchParams({key:L,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});try{return(await y.get(`${v}?${n}`)).data}catch(o){console.log(o)}}function f(s,t){const n=s.hits.map(e=>`
      <li>
        <a class="gallery-link" href=${e.largeImageURL}>
          <img src="${e.webformatURL}" alt="${e.tags}">
          <div>
            <p><span>Likes</span>${e.likes}</p>
            <p><span>Views</span>${e.views}</p>
            <p><span>Comments</span>${e.comments}</p>
            <p><span>Downloads</span>${e.downloads}</p>
          </div>
        </a>
      </li>`).join("");t.insertAdjacentHTML("beforeend",n),new h(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const m=document.querySelector(".form"),S=document.querySelector(".input"),d=document.querySelector(".gallery"),a=document.querySelector(".loader"),u=document.querySelector(".btn");let i,l=1;function b(s){if(u.classList.add("visually-hidden"),s.preventDefault(),d.innerHTML="",a.classList.remove("visually-hidden"),i=S.value.trim(),i===""){a.classList.add("visually-hidden");return}l=1,p(i,l).then(t=>{a.classList.add("visually-hidden"),t.hits.length===0?g.error({maxWidth:"370px",position:"topRight",messageColor:"white",backgroundColor:"red",message:"Sorry, there are no images matching your search query. Please try again!"}):(a.classList.add("visually-hidden"),u.classList.remove("visually-hidden"),f(t,d))}).catch(t=>{console.error(t)}),m.reset()}async function w(s){l+=1;const t=await p(i,l);f(t,d)}m.addEventListener("submit",b);u.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
