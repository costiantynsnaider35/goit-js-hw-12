import{a as m,S as y,i as h}from"./assets/vendor-b11e2a50.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const g="45139433-b39febc8ea292e87313288c36",L="https://pixabay.com/api/";async function u(s,t){const n=new URLSearchParams({key:g,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t});try{return(await m.get(`${L}?${n}`)).data}catch(o){console.log(o)}}function p(s,t){const n=s.hits.map(e=>`
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
      </li>`).join("");t.insertAdjacentHTML("beforeend",n),new y(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}const f=document.querySelector(".form"),v=document.querySelector(".input"),d=document.querySelector(".gallery"),a=document.querySelector(".loader"),S=document.querySelector(".btn");let i,c=1;function b(s){if(s.preventDefault(),d.innerHTML="",a.classList.remove("visually-hidden"),i=v.value.trim(),i===""){a.classList.add("visually-hidden");return}c=1,u(i,c).then(t=>{a.classList.add("visually-hidden"),t.hits.length===0?h.error({maxWidth:"370px",position:"topRight",messageColor:"white",backgroundColor:"red",message:"Sorry, there are no images matching your search query. Please try again!"}):(a.classList.add("visually-hidden"),p(t,d))}).catch(t=>{console.error(t)}),f.reset()}async function w(s){c+=1;const t=await u(i,c);p(t,d)}f.addEventListener("submit",b);S.addEventListener("click",w);
//# sourceMappingURL=commonHelpers.js.map
