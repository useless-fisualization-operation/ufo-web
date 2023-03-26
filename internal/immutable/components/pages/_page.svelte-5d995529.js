import{S as Ve,i as Je,s as Ye,k as H,a as P,l as M,m as S,h as m,c as B,n as y,p as Q,b as K,H as _,C as He,J as Me,q as W,K as Ce,r as b,L as A0,x as Ze,e as he,y as qe,M as Dr,z as $e,N as ge,f as We,g as h0,t as we,d as c0,A as je,O as Zt,I as Gd,o as H0,P as Ke,v as Si,Q as Lt,D as Kr,R as M0,T as C0,E as Xr,F as Er,G as Gr,U as S0,V as N0,W as f0,u as Le,X as yt,Y as ii}from"../../chunks/index-f3733c48.js";import{w as F0}from"../../chunks/index-6e6c57e8.js";function L0(e){return e}function T0(e){if(e==null)return L0;var t,a,i=e.scale[0],l=e.scale[1],d=e.translate[0],r=e.translate[1];return function(o,s){s||(t=a=0);var n=2,g=o.length,u=new Array(g);for(u[0]=(t+=o[0])*i+d,u[1]=(a+=o[1])*l+r;n<g;)u[n]=o[n],++n;return u}}function R0(e,t){for(var a,i=e.length,l=i-t;l<--i;)a=e[l],e[l++]=e[i],e[i]=a}function k0(e,t){return typeof t=="string"&&(t=e.objects[t]),t.type==="GeometryCollection"?{type:"FeatureCollection",features:t.geometries.map(function(a){return Vr(e,a)})}:Vr(e,t)}function Vr(e,t){var a=t.id,i=t.bbox,l=t.properties==null?{}:t.properties,d=I0(e,t);return a==null&&i==null?{type:"Feature",properties:l,geometry:d}:i==null?{type:"Feature",id:a,properties:l,geometry:d}:{type:"Feature",id:a,bbox:i,properties:l,geometry:d}}function I0(e,t){var a=T0(e.transform),i=e.arcs;function l(g,u){u.length&&u.pop();for(var p=i[g<0?~g:g],A=0,h=p.length;A<h;++A)u.push(a(p[A],A));g<0&&R0(u,h)}function d(g){return a(g)}function r(g){for(var u=[],p=0,A=g.length;p<A;++p)l(g[p],u);return u.length<2&&u.push(u[0]),u}function o(g){for(var u=r(g);u.length<4;)u.push(u[0]);return u}function s(g){return g.map(o)}function n(g){var u=g.type,p;switch(u){case"GeometryCollection":return{type:u,geometries:g.geometries.map(n)};case"Point":p=d(g.coordinates);break;case"MultiPoint":p=g.coordinates.map(d);break;case"LineString":p=r(g.arcs);break;case"MultiLineString":p=g.arcs.map(r);break;case"Polygon":p=s(g.arcs);break;case"MultiPolygon":p=g.arcs.map(s);break;default:return null}return{type:u,coordinates:p}}return n(t)}function mi(e,t){return e==null||t==null?NaN:e<t?-1:e>t?1:e>=t?0:NaN}function v0(e,t){return e==null||t==null?NaN:t<e?-1:t>e?1:t>=e?0:NaN}function M9(e){let t,a,i;e.length!==2?(t=mi,a=(o,s)=>mi(e(o),s),i=(o,s)=>e(o)-s):(t=e===mi||e===v0?e:O0,a=e,i=e);function l(o,s,n=0,g=o.length){if(n<g){if(t(s,s)!==0)return g;do{const u=n+g>>>1;a(o[u],s)<0?n=u+1:g=u}while(n<g)}return n}function d(o,s,n=0,g=o.length){if(n<g){if(t(s,s)!==0)return g;do{const u=n+g>>>1;a(o[u],s)<=0?n=u+1:g=u}while(n<g)}return n}function r(o,s,n=0,g=o.length){const u=l(o,s,n,g-1);return u>n&&i(o[u-1],s)>-i(o[u],s)?u-1:u}return{left:l,center:r,right:d}}function O0(){return 0}function P0(e){return e===null?NaN:+e}const B0=M9(mi),W0=B0.right;M9(P0).center;const b0=W0;class Jt{constructor(){this._partials=new Float64Array(32),this._n=0}add(t){const a=this._partials;let i=0;for(let l=0;l<this._n&&l<32;l++){const d=a[l],r=t+d,o=Math.abs(t)<Math.abs(d)?t-(r-d):d-(r-t);o&&(a[i++]=o),t=r}return a[i]=t,this._n=i+1,this}valueOf(){const t=this._partials;let a=this._n,i,l,d,r=0;if(a>0){for(r=t[--a];a>0&&(i=r,l=t[--a],r=i+l,d=l-(r-i),!d););a>0&&(d<0&&t[a-1]<0||d>0&&t[a-1]>0)&&(l=d*2,i=r+l,l==i-r&&(r=i))}return r}}const w0=Math.sqrt(50),D0=Math.sqrt(10),K0=Math.sqrt(2);function Ni(e,t,a){const i=(t-e)/Math.max(0,a),l=Math.floor(Math.log10(i)),d=i/Math.pow(10,l),r=d>=w0?10:d>=D0?5:d>=K0?2:1;let o,s,n;return l<0?(n=Math.pow(10,-l)/r,o=Math.round(e*n),s=Math.round(t*n),o/n<e&&++o,s/n>t&&--s,n=-n):(n=Math.pow(10,l)*r,o=Math.round(e/n),s=Math.round(t/n),o*n<e&&++o,s*n>t&&--s),s<o&&.5<=a&&a<2?Ni(e,t,a*2):[o,s,n]}function X0(e,t,a){if(t=+t,e=+e,a=+a,!(a>0))return[];if(e===t)return[e];const i=t<e,[l,d,r]=i?Ni(t,e,a):Ni(e,t,a);if(!(d>=l))return[];const o=d-l+1,s=new Array(o);if(i)if(r<0)for(let n=0;n<o;++n)s[n]=(d-n)/-r;else for(let n=0;n<o;++n)s[n]=(d-n)*r;else if(r<0)for(let n=0;n<o;++n)s[n]=(l+n)/-r;else for(let n=0;n<o;++n)s[n]=(l+n)*r;return s}function yd(e,t,a){return t=+t,e=+e,a=+a,Ni(e,t,a)[2]}function E0(e,t,a){t=+t,e=+e,a=+a;const i=t<e,l=i?yd(t,e,a):yd(e,t,a);return(i?-1:1)*(l<0?1/-l:l)}function*G0(e){for(const t of e)yield*t}function C9(e){return Array.from(G0(e))}var me=1e-6,V0=1e-12,ue=Math.PI,at=ue/2,Jr=ue/4,lt=ue*2,dt=180/ue,Xe=ue/180,Ne=Math.abs,J0=Math.atan,ka=Math.atan2,Te=Math.cos,Se=Math.sin,yi=Math.sign||function(e){return e>0?1:e<0?-1:0},ft=Math.sqrt;function Y0(e){return e>1?0:e<-1?ue:Math.acos(e)}function Yt(e){return e>1?at:e<-1?-at:Math.asin(e)}function it(){}function fi(e,t){e&&xr.hasOwnProperty(e.type)&&xr[e.type](e,t)}var Yr={Feature:function(e,t){fi(e.geometry,t)},FeatureCollection:function(e,t){for(var a=e.features,i=-1,l=a.length;++i<l;)fi(a[i].geometry,t)}},xr={Sphere:function(e,t){t.sphere()},Point:function(e,t){e=e.coordinates,t.point(e[0],e[1],e[2])},MultiPoint:function(e,t){for(var a=e.coordinates,i=-1,l=a.length;++i<l;)e=a[i],t.point(e[0],e[1],e[2])},LineString:function(e,t){Ad(e.coordinates,t,0)},MultiLineString:function(e,t){for(var a=e.coordinates,i=-1,l=a.length;++i<l;)Ad(a[i],t,0)},Polygon:function(e,t){Ur(e.coordinates,t)},MultiPolygon:function(e,t){for(var a=e.coordinates,i=-1,l=a.length;++i<l;)Ur(a[i],t)},GeometryCollection:function(e,t){for(var a=e.geometries,i=-1,l=a.length;++i<l;)fi(a[i],t)}};function Ad(e,t,a){var i=-1,l=e.length-a,d;for(t.lineStart();++i<l;)d=e[i],t.point(d[0],d[1],d[2]);t.lineEnd()}function Ur(e,t){var a=-1,i=e.length;for(t.polygonStart();++a<i;)Ad(e[a],t,1);t.polygonEnd()}function Fa(e,t){e&&Yr.hasOwnProperty(e.type)?Yr[e.type](e,t):fi(e,t)}function hd(e){return[ka(e[1],e[0]),Yt(e[2])]}function Ia(e){var t=e[0],a=e[1],i=Te(a);return[i*Te(t),i*Se(t),Se(a)]}function li(e,t){return e[0]*t[0]+e[1]*t[1]+e[2]*t[2]}function Fi(e,t){return[e[1]*t[2]-e[2]*t[1],e[2]*t[0]-e[0]*t[2],e[0]*t[1]-e[1]*t[0]]}function dd(e,t){e[0]+=t[0],e[1]+=t[1],e[2]+=t[2]}function di(e,t){return[e[0]*t,e[1]*t,e[2]*t]}function cd(e){var t=ft(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]/=t,e[1]/=t,e[2]/=t}function Hd(e,t){function a(i,l){return i=e(i,l),t(i[0],i[1])}return e.invert&&t.invert&&(a.invert=function(i,l){return i=t.invert(i,l),i&&e.invert(i[0],i[1])}),a}function Md(e,t){return Ne(e)>ue&&(e-=Math.round(e/lt)*lt),[e,t]}Md.invert=Md;function x0(e,t,a){return(e%=lt)?t||a?Hd(Zr(e),qr(t,a)):Zr(e):t||a?qr(t,a):Md}function zr(e){return function(t,a){return t+=e,Ne(t)>ue&&(t-=Math.round(t/lt)*lt),[t,a]}}function Zr(e){var t=zr(e);return t.invert=zr(-e),t}function qr(e,t){var a=Te(e),i=Se(e),l=Te(t),d=Se(t);function r(o,s){var n=Te(s),g=Te(o)*n,u=Se(o)*n,p=Se(s),A=p*a+g*i;return[ka(u*l-A*d,g*a-p*i),Yt(A*l+u*d)]}return r.invert=function(o,s){var n=Te(s),g=Te(o)*n,u=Se(o)*n,p=Se(s),A=p*l-u*d;return[ka(u*l+p*d,g*a+A*i),Yt(A*a-g*i)]},r}function U0(e,t,a,i,l,d){if(a){var r=Te(t),o=Se(t),s=i*a;l==null?(l=t+i*lt,d=t-s/2):(l=$r(r,l),d=$r(r,d),(i>0?l<d:l>d)&&(l+=i*lt));for(var n,g=l;i>0?g>d:g<d;g-=s)n=hd([r,-o*Te(g),-o*Se(g)]),e.point(n[0],n[1])}}function $r(e,t){t=Ia(t),t[0]-=e,cd(t);var a=Y0(-t[1]);return((-t[2]<0?-a:a)+lt-me)%lt}function S9(){var e=[],t;return{point:function(a,i,l){t.push([a,i,l])},lineStart:function(){e.push(t=[])},lineEnd:it,rejoin:function(){e.length>1&&e.push(e.pop().concat(e.shift()))},result:function(){var a=e;return e=[],t=null,a}}}function Ai(e,t){return Ne(e[0]-t[0])<me&&Ne(e[1]-t[1])<me}function ri(e,t,a,i){this.x=e,this.z=t,this.o=a,this.e=i,this.v=!1,this.n=this.p=null}function N9(e,t,a,i,l){var d=[],r=[],o,s;if(e.forEach(function(h){if(!((C=h.length-1)<=0)){var C,c=h[0],f=h[C],L;if(Ai(c,f)){if(!c[2]&&!f[2]){for(l.lineStart(),o=0;o<C;++o)l.point((c=h[o])[0],c[1]);l.lineEnd();return}f[0]+=2*me}d.push(L=new ri(c,h,null,!0)),r.push(L.o=new ri(c,null,L,!1)),d.push(L=new ri(f,h,null,!1)),r.push(L.o=new ri(f,null,L,!0))}}),!!d.length){for(r.sort(t),jr(d),jr(r),o=0,s=r.length;o<s;++o)r[o].e=a=!a;for(var n=d[0],g,u;;){for(var p=n,A=!0;p.v;)if((p=p.n)===n)return;g=p.z,l.lineStart();do{if(p.v=p.o.v=!0,p.e){if(A)for(o=0,s=g.length;o<s;++o)l.point((u=g[o])[0],u[1]);else i(p.x,p.n.x,1,l);p=p.n}else{if(A)for(g=p.p.z,o=g.length-1;o>=0;--o)l.point((u=g[o])[0],u[1]);else i(p.x,p.p.x,-1,l);p=p.p}p=p.o,g=p.z,A=!A}while(!p.v);l.lineEnd()}}}function jr(e){if(t=e.length){for(var t,a=0,i=e[0],l;++a<t;)i.n=l=e[a],l.p=i,i=l;i.n=l=e[0],l.p=i}}function rd(e){return Ne(e[0])<=ue?e[0]:yi(e[0])*((Ne(e[0])+ue)%lt-ue)}function z0(e,t){var a=rd(t),i=t[1],l=Se(i),d=[Se(a),-Te(a),0],r=0,o=0,s=new Jt;l===1?i=at+me:l===-1&&(i=-at-me);for(var n=0,g=e.length;n<g;++n)if(p=(u=e[n]).length)for(var u,p,A=u[p-1],h=rd(A),C=A[1]/2+Jr,c=Se(C),f=Te(C),L=0;L<p;++L,h=T,c=O,f=J,A=k){var k=u[L],T=rd(k),I=k[1]/2+Jr,O=Se(I),J=Te(I),G=T-h,X=G>=0?1:-1,j=X*G,R=j>ue,z=c*O;if(s.add(ka(z*X*Se(j),f*J+z*Te(j))),r+=R?G+X*lt:G,R^h>=a^T>=a){var q=Fi(Ia(A),Ia(k));cd(q);var N=Fi(d,q);cd(N);var F=(R^G>=0?-1:1)*Yt(N[2]);(i>F||i===F&&(q[0]||q[1]))&&(o+=R^G>=0?1:-1)}}return(r<-me||r<me&&s<-V0)^o&1}function f9(e,t,a,i){return function(l){var d=t(l),r=S9(),o=t(r),s=!1,n,g,u,p={point:A,lineStart:C,lineEnd:c,polygonStart:function(){p.point=f,p.lineStart=L,p.lineEnd=k,g=[],n=[]},polygonEnd:function(){p.point=A,p.lineStart=C,p.lineEnd=c,g=C9(g);var T=z0(n,i);g.length?(s||(l.polygonStart(),s=!0),N9(g,q0,T,a,l)):T&&(s||(l.polygonStart(),s=!0),l.lineStart(),a(null,null,1,l),l.lineEnd()),s&&(l.polygonEnd(),s=!1),g=n=null},sphere:function(){l.polygonStart(),l.lineStart(),a(null,null,1,l),l.lineEnd(),l.polygonEnd()}};function A(T,I){e(T,I)&&l.point(T,I)}function h(T,I){d.point(T,I)}function C(){p.point=h,d.lineStart()}function c(){p.point=A,d.lineEnd()}function f(T,I){u.push([T,I]),o.point(T,I)}function L(){o.lineStart(),u=[]}function k(){f(u[0][0],u[0][1]),o.lineEnd();var T=o.clean(),I=r.result(),O,J=I.length,G,X,j;if(u.pop(),n.push(u),u=null,!!J){if(T&1){if(X=I[0],(G=X.length-1)>0){for(s||(l.polygonStart(),s=!0),l.lineStart(),O=0;O<G;++O)l.point((j=X[O])[0],j[1]);l.lineEnd()}return}J>1&&T&2&&I.push(I.pop().concat(I.shift())),g.push(I.filter(Z0))}}return p}}function Z0(e){return e.length>1}function q0(e,t){return((e=e.x)[0]<0?e[1]-at-me:at-e[1])-((t=t.x)[0]<0?t[1]-at-me:at-t[1])}const Qr=f9(function(){return!0},$0,Q0,[-ue,-at]);function $0(e){var t=NaN,a=NaN,i=NaN,l;return{lineStart:function(){e.lineStart(),l=1},point:function(d,r){var o=d>0?ue:-ue,s=Ne(d-t);Ne(s-ue)<me?(e.point(t,a=(a+r)/2>0?at:-at),e.point(i,a),e.lineEnd(),e.lineStart(),e.point(o,a),e.point(d,a),l=0):i!==o&&s>=ue&&(Ne(t-i)<me&&(t-=i*me),Ne(d-o)<me&&(d-=o*me),a=j0(t,a,d,r),e.point(i,a),e.lineEnd(),e.lineStart(),e.point(o,a),l=0),e.point(t=d,a=r),i=o},lineEnd:function(){e.lineEnd(),t=a=NaN},clean:function(){return 2-l}}}function j0(e,t,a,i){var l,d,r=Se(e-a);return Ne(r)>me?J0((Se(t)*(d=Te(i))*Se(a)-Se(i)*(l=Te(t))*Se(e))/(l*d*r)):(t+i)/2}function Q0(e,t,a,i){var l;if(e==null)l=a*at,i.point(-ue,l),i.point(0,l),i.point(ue,l),i.point(ue,0),i.point(ue,-l),i.point(0,-l),i.point(-ue,-l),i.point(-ue,0),i.point(-ue,l);else if(Ne(e[0]-t[0])>me){var d=e[0]<t[0]?ue:-ue;l=a*d/2,i.point(-d,l),i.point(0,l),i.point(d,l)}else i.point(t[0],t[1])}function en(e){var t=Te(e),a=6*Xe,i=t>0,l=Ne(t)>me;function d(g,u,p,A){U0(A,e,a,p,g,u)}function r(g,u){return Te(g)*Te(u)>t}function o(g){var u,p,A,h,C;return{lineStart:function(){h=A=!1,C=1},point:function(c,f){var L=[c,f],k,T=r(c,f),I=i?T?0:n(c,f):T?n(c+(c<0?ue:-ue),f):0;if(!u&&(h=A=T)&&g.lineStart(),T!==A&&(k=s(u,L),(!k||Ai(u,k)||Ai(L,k))&&(L[2]=1)),T!==A)C=0,T?(g.lineStart(),k=s(L,u),g.point(k[0],k[1])):(k=s(u,L),g.point(k[0],k[1],2),g.lineEnd()),u=k;else if(l&&u&&i^T){var O;!(I&p)&&(O=s(L,u,!0))&&(C=0,i?(g.lineStart(),g.point(O[0][0],O[0][1]),g.point(O[1][0],O[1][1]),g.lineEnd()):(g.point(O[1][0],O[1][1]),g.lineEnd(),g.lineStart(),g.point(O[0][0],O[0][1],3)))}T&&(!u||!Ai(u,L))&&g.point(L[0],L[1]),u=L,A=T,p=I},lineEnd:function(){A&&g.lineEnd(),u=null},clean:function(){return C|(h&&A)<<1}}}function s(g,u,p){var A=Ia(g),h=Ia(u),C=[1,0,0],c=Fi(A,h),f=li(c,c),L=c[0],k=f-L*L;if(!k)return!p&&g;var T=t*f/k,I=-t*L/k,O=Fi(C,c),J=di(C,T),G=di(c,I);dd(J,G);var X=O,j=li(J,X),R=li(X,X),z=j*j-R*(li(J,J)-1);if(!(z<0)){var q=ft(z),N=di(X,(-j-q)/R);if(dd(N,J),N=hd(N),!p)return N;var F=g[0],v=u[0],D=g[1],E=u[1],x;v<F&&(x=F,F=v,v=x);var w=v-F,$=Ne(w-ue)<me,ee=$||w<me;if(!$&&E<D&&(x=D,D=E,E=x),ee?$?D+E>0^N[1]<(Ne(N[0]-F)<me?D:E):D<=N[1]&&N[1]<=E:w>ue^(F<=N[0]&&N[0]<=v)){var Y=di(X,(-j+q)/R);return dd(Y,J),[N,hd(Y)]}}}function n(g,u){var p=i?e:ue-e,A=0;return g<-p?A|=1:g>p&&(A|=2),u<-p?A|=4:u>p&&(A|=8),A}return f9(r,o,d,i?[0,-e]:[-ue,e-ue])}function tn(e,t,a,i,l,d){var r=e[0],o=e[1],s=t[0],n=t[1],g=0,u=1,p=s-r,A=n-o,h;if(h=a-r,!(!p&&h>0)){if(h/=p,p<0){if(h<g)return;h<u&&(u=h)}else if(p>0){if(h>u)return;h>g&&(g=h)}if(h=l-r,!(!p&&h<0)){if(h/=p,p<0){if(h>u)return;h>g&&(g=h)}else if(p>0){if(h<g)return;h<u&&(u=h)}if(h=i-o,!(!A&&h>0)){if(h/=A,A<0){if(h<g)return;h<u&&(u=h)}else if(A>0){if(h>u)return;h>g&&(g=h)}if(h=d-o,!(!A&&h<0)){if(h/=A,A<0){if(h>u)return;h>g&&(g=h)}else if(A>0){if(h<g)return;h<u&&(u=h)}return g>0&&(e[0]=r+g*p,e[1]=o+g*A),u<1&&(t[0]=r+u*p,t[1]=o+u*A),!0}}}}}var Ka=1e9,oi=-Ka;function an(e,t,a,i){function l(n,g){return e<=n&&n<=a&&t<=g&&g<=i}function d(n,g,u,p){var A=0,h=0;if(n==null||(A=r(n,u))!==(h=r(g,u))||s(n,g)<0^u>0)do p.point(A===0||A===3?e:a,A>1?i:t);while((A=(A+u+4)%4)!==h);else p.point(g[0],g[1])}function r(n,g){return Ne(n[0]-e)<me?g>0?0:3:Ne(n[0]-a)<me?g>0?2:1:Ne(n[1]-t)<me?g>0?1:0:g>0?3:2}function o(n,g){return s(n.x,g.x)}function s(n,g){var u=r(n,1),p=r(g,1);return u!==p?u-p:u===0?g[1]-n[1]:u===1?n[0]-g[0]:u===2?n[1]-g[1]:g[0]-n[0]}return function(n){var g=n,u=S9(),p,A,h,C,c,f,L,k,T,I,O,J={point:G,lineStart:z,lineEnd:q,polygonStart:j,polygonEnd:R};function G(F,v){l(F,v)&&g.point(F,v)}function X(){for(var F=0,v=0,D=A.length;v<D;++v)for(var E=A[v],x=1,w=E.length,$=E[0],ee,Y,U=$[0],te=$[1];x<w;++x)ee=U,Y=te,$=E[x],U=$[0],te=$[1],Y<=i?te>i&&(U-ee)*(i-Y)>(te-Y)*(e-ee)&&++F:te<=i&&(U-ee)*(i-Y)<(te-Y)*(e-ee)&&--F;return F}function j(){g=u,p=[],A=[],O=!0}function R(){var F=X(),v=O&&F,D=(p=C9(p)).length;(v||D)&&(n.polygonStart(),v&&(n.lineStart(),d(null,null,1,n),n.lineEnd()),D&&N9(p,o,F,d,n),n.polygonEnd()),g=n,p=A=h=null}function z(){J.point=N,A&&A.push(h=[]),I=!0,T=!1,L=k=NaN}function q(){p&&(N(C,c),f&&T&&u.rejoin(),p.push(u.result())),J.point=G,T&&g.lineEnd()}function N(F,v){var D=l(F,v);if(A&&h.push([F,v]),I)C=F,c=v,f=D,I=!1,D&&(g.lineStart(),g.point(F,v));else if(D&&T)g.point(F,v);else{var E=[L=Math.max(oi,Math.min(Ka,L)),k=Math.max(oi,Math.min(Ka,k))],x=[F=Math.max(oi,Math.min(Ka,F)),v=Math.max(oi,Math.min(Ka,v))];tn(E,x,e,t,a,i)?(T||(g.lineStart(),g.point(E[0],E[1])),g.point(x[0],x[1]),D||g.lineEnd(),O=!1):D&&(g.lineStart(),g.point(F,v),O=!1)}L=F,k=v,T=D}return J}}const Cd=e=>e;var od=new Jt,Sd=new Jt,F9,L9,Nd,fd,Rt={point:it,lineStart:it,lineEnd:it,polygonStart:function(){Rt.lineStart=ln,Rt.lineEnd=rn},polygonEnd:function(){Rt.lineStart=Rt.lineEnd=Rt.point=it,od.add(Ne(Sd)),Sd=new Jt},result:function(){var e=od/2;return od=new Jt,e}};function ln(){Rt.point=dn}function dn(e,t){Rt.point=T9,F9=Nd=e,L9=fd=t}function T9(e,t){Sd.add(fd*e-Nd*t),Nd=e,fd=t}function rn(){T9(F9,L9)}const eo=Rt;var va=1/0,Li=va,xa=-va,Ti=xa,on={point:nn,lineStart:it,lineEnd:it,polygonStart:it,polygonEnd:it,result:function(){var e=[[va,Li],[xa,Ti]];return xa=Ti=-(Li=va=1/0),e}};function nn(e,t){e<va&&(va=e),e>xa&&(xa=e),t<Li&&(Li=t),t>Ti&&(Ti=t)}const Ri=on;var Fd=0,Ld=0,Xa=0,ki=0,Ii=0,La=0,Td=0,Rd=0,Ea=0,R9,k9,At,ht,ot={point:xt,lineStart:to,lineEnd:ao,polygonStart:function(){ot.lineStart=_n,ot.lineEnd=sn},polygonEnd:function(){ot.point=xt,ot.lineStart=to,ot.lineEnd=ao},result:function(){var e=Ea?[Td/Ea,Rd/Ea]:La?[ki/La,Ii/La]:Xa?[Fd/Xa,Ld/Xa]:[NaN,NaN];return Fd=Ld=Xa=ki=Ii=La=Td=Rd=Ea=0,e}};function xt(e,t){Fd+=e,Ld+=t,++Xa}function to(){ot.point=gn}function gn(e,t){ot.point=pn,xt(At=e,ht=t)}function pn(e,t){var a=e-At,i=t-ht,l=ft(a*a+i*i);ki+=l*(At+e)/2,Ii+=l*(ht+t)/2,La+=l,xt(At=e,ht=t)}function ao(){ot.point=xt}function _n(){ot.point=un}function sn(){I9(R9,k9)}function un(e,t){ot.point=I9,xt(R9=At=e,k9=ht=t)}function I9(e,t){var a=e-At,i=t-ht,l=ft(a*a+i*i);ki+=l*(At+e)/2,Ii+=l*(ht+t)/2,La+=l,l=ht*e-At*t,Td+=l*(At+e),Rd+=l*(ht+t),Ea+=l*3,xt(At=e,ht=t)}const io=ot;function v9(e){this._context=e}v9.prototype={_radius:4.5,pointRadius:function(e){return this._radius=e,this},polygonStart:function(){this._line=0},polygonEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){this._line===0&&this._context.closePath(),this._point=NaN},point:function(e,t){switch(this._point){case 0:{this._context.moveTo(e,t),this._point=1;break}case 1:{this._context.lineTo(e,t);break}default:{this._context.moveTo(e+this._radius,t),this._context.arc(e,t,this._radius,0,lt);break}}},result:it};var kd=new Jt,nd,O9,P9,Ga,Va,vi={point:it,lineStart:function(){vi.point=mn},lineEnd:function(){nd&&B9(O9,P9),vi.point=it},polygonStart:function(){nd=!0},polygonEnd:function(){nd=null},result:function(){var e=+kd;return kd=new Jt,e}};function mn(e,t){vi.point=B9,O9=Ga=e,P9=Va=t}function B9(e,t){Ga-=e,Va-=t,kd.add(ft(Ga*Ga+Va*Va)),Ga=e,Va=t}const lo=vi;let ro,Oi,oo,no;class go{constructor(t){this._append=t==null?W9:yn(t),this._radius=4.5,this._=""}pointRadius(t){return this._radius=+t,this}polygonStart(){this._line=0}polygonEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){this._line===0&&(this._+="Z"),this._point=NaN}point(t,a){switch(this._point){case 0:{this._append`M${t},${a}`,this._point=1;break}case 1:{this._append`L${t},${a}`;break}default:{if(this._append`M${t},${a}`,this._radius!==oo||this._append!==Oi){const i=this._radius,l=this._;this._="",this._append`m0,${i}a${i},${i} 0 1,1 0,${-2*i}a${i},${i} 0 1,1 0,${2*i}z`,oo=i,Oi=this._append,no=this._,this._=l}this._+=no;break}}}result(){const t=this._;return this._="",t.length?t:null}}function W9(e){let t=1;this._+=e[0];for(const a=e.length;t<a;++t)this._+=arguments[t]+e[t]}function yn(e){const t=Math.floor(e);if(!(t>=0))throw new RangeError(`invalid digits: ${e}`);if(t>15)return W9;if(t!==ro){const a=10**t;ro=t,Oi=function(l){let d=1;this._+=l[0];for(const r=l.length;d<r;++d)this._+=Math.round(arguments[d]*a)/a+l[d]}}return Oi}function An(e,t){let a=3,i=4.5,l,d;function r(o){return o&&(typeof i=="function"&&d.pointRadius(+i.apply(this,arguments)),Fa(o,l(d))),d.result()}return r.area=function(o){return Fa(o,l(eo)),eo.result()},r.measure=function(o){return Fa(o,l(lo)),lo.result()},r.bounds=function(o){return Fa(o,l(Ri)),Ri.result()},r.centroid=function(o){return Fa(o,l(io)),io.result()},r.projection=function(o){return arguments.length?(l=o==null?(e=null,Cd):(e=o).stream,r):e},r.context=function(o){return arguments.length?(d=o==null?(t=null,new go(a)):new v9(t=o),typeof i!="function"&&d.pointRadius(i),r):t},r.pointRadius=function(o){return arguments.length?(i=typeof o=="function"?o:(d.pointRadius(+o),+o),r):i},r.digits=function(o){if(!arguments.length)return a;if(o==null)a=null;else{const s=Math.floor(o);if(!(s>=0))throw new RangeError(`invalid digits: ${o}`);a=s}return t===null&&(d=new go(a)),r},r.projection(e).digits(a).context(t)}function Vd(e){return function(t){var a=new Id;for(var i in e)a[i]=e[i];return a.stream=t,a}}function Id(){}Id.prototype={constructor:Id,point:function(e,t){this.stream.point(e,t)},sphere:function(){this.stream.sphere()},lineStart:function(){this.stream.lineStart()},lineEnd:function(){this.stream.lineEnd()},polygonStart:function(){this.stream.polygonStart()},polygonEnd:function(){this.stream.polygonEnd()}};function Jd(e,t,a){var i=e.clipExtent&&e.clipExtent();return e.scale(150).translate([0,0]),i!=null&&e.clipExtent(null),Fa(a,e.stream(Ri)),t(Ri.result()),i!=null&&e.clipExtent(i),e}function Yd(e,t,a){return Jd(e,function(i){var l=t[1][0]-t[0][0],d=t[1][1]-t[0][1],r=Math.min(l/(i[1][0]-i[0][0]),d/(i[1][1]-i[0][1])),o=+t[0][0]+(l-r*(i[1][0]+i[0][0]))/2,s=+t[0][1]+(d-r*(i[1][1]+i[0][1]))/2;e.scale(150*r).translate([o,s])},a)}function b9(e,t,a){return Yd(e,[[0,0],t],a)}function w9(e,t,a){return Jd(e,function(i){var l=+t,d=l/(i[1][0]-i[0][0]),r=(l-d*(i[1][0]+i[0][0]))/2,o=-d*i[0][1];e.scale(150*d).translate([r,o])},a)}function D9(e,t,a){return Jd(e,function(i){var l=+t,d=l/(i[1][1]-i[0][1]),r=-d*i[0][0],o=(l-d*(i[1][1]+i[0][1]))/2;e.scale(150*d).translate([r,o])},a)}var po=16,hn=Te(30*Xe);function _o(e,t){return+t?Hn(e,t):cn(e)}function cn(e){return Vd({point:function(t,a){t=e(t,a),this.stream.point(t[0],t[1])}})}function Hn(e,t){function a(i,l,d,r,o,s,n,g,u,p,A,h,C,c){var f=n-i,L=g-l,k=f*f+L*L;if(k>4*t&&C--){var T=r+p,I=o+A,O=s+h,J=ft(T*T+I*I+O*O),G=Yt(O/=J),X=Ne(Ne(O)-1)<me||Ne(d-u)<me?(d+u)/2:ka(I,T),j=e(X,G),R=j[0],z=j[1],q=R-i,N=z-l,F=L*q-f*N;(F*F/k>t||Ne((f*q+L*N)/k-.5)>.3||r*p+o*A+s*h<hn)&&(a(i,l,d,r,o,s,R,z,X,T/=J,I/=J,O,C,c),c.point(R,z),a(R,z,X,T,I,O,n,g,u,p,A,h,C,c))}}return function(i){var l,d,r,o,s,n,g,u,p,A,h,C,c={point:f,lineStart:L,lineEnd:T,polygonStart:function(){i.polygonStart(),c.lineStart=I},polygonEnd:function(){i.polygonEnd(),c.lineStart=L}};function f(G,X){G=e(G,X),i.point(G[0],G[1])}function L(){u=NaN,c.point=k,i.lineStart()}function k(G,X){var j=Ia([G,X]),R=e(G,X);a(u,p,g,A,h,C,u=R[0],p=R[1],g=G,A=j[0],h=j[1],C=j[2],po,i),i.point(u,p)}function T(){c.point=f,i.lineEnd()}function I(){L(),c.point=O,c.lineEnd=J}function O(G,X){k(l=G,X),d=u,r=p,o=A,s=h,n=C,c.point=k}function J(){a(u,p,g,A,h,C,d,r,l,o,s,n,po,i),c.lineEnd=T,T()}return c}}var Mn=Vd({point:function(e,t){this.stream.point(e*Xe,t*Xe)}});function Cn(e){return Vd({point:function(t,a){var i=e(t,a);return this.stream.point(i[0],i[1])}})}function Sn(e,t,a,i,l){function d(r,o){return r*=i,o*=l,[t+e*r,a-e*o]}return d.invert=function(r,o){return[(r-t)/e*i,(a-o)/e*l]},d}function so(e,t,a,i,l,d){if(!d)return Sn(e,t,a,i,l);var r=Te(d),o=Se(d),s=r*e,n=o*e,g=r/e,u=o/e,p=(o*a-r*t)/e,A=(o*t+r*a)/e;function h(C,c){return C*=i,c*=l,[s*C-n*c+t,a-n*C-s*c]}return h.invert=function(C,c){return[i*(g*C-u*c+p),l*(A-u*C-g*c)]},h}function Nn(e){var t,a=150,i=480,l=250,d=0,r=0,o=0,s=0,n=0,g,u=0,p=1,A=1,h=null,C=Qr,c=null,f,L,k,T=Cd,I=.5,O,J,G,X,j;function R(F){return G(F[0]*Xe,F[1]*Xe)}function z(F){return F=G.invert(F[0],F[1]),F&&[F[0]*dt,F[1]*dt]}R.stream=function(F){return X&&j===F?X:X=Mn(Cn(g)(C(O(T(j=F)))))},R.preclip=function(F){return arguments.length?(C=F,h=void 0,N()):C},R.postclip=function(F){return arguments.length?(T=F,c=f=L=k=null,N()):T},R.clipAngle=function(F){return arguments.length?(C=+F?en(h=F*Xe):(h=null,Qr),N()):h*dt},R.clipExtent=function(F){return arguments.length?(T=F==null?(c=f=L=k=null,Cd):an(c=+F[0][0],f=+F[0][1],L=+F[1][0],k=+F[1][1]),N()):c==null?null:[[c,f],[L,k]]},R.scale=function(F){return arguments.length?(a=+F,q()):a},R.translate=function(F){return arguments.length?(i=+F[0],l=+F[1],q()):[i,l]},R.center=function(F){return arguments.length?(d=F[0]%360*Xe,r=F[1]%360*Xe,q()):[d*dt,r*dt]},R.rotate=function(F){return arguments.length?(o=F[0]%360*Xe,s=F[1]%360*Xe,n=F.length>2?F[2]%360*Xe:0,q()):[o*dt,s*dt,n*dt]},R.angle=function(F){return arguments.length?(u=F%360*Xe,q()):u*dt},R.reflectX=function(F){return arguments.length?(p=F?-1:1,q()):p<0},R.reflectY=function(F){return arguments.length?(A=F?-1:1,q()):A<0},R.precision=function(F){return arguments.length?(O=_o(J,I=F*F),N()):ft(I)},R.fitExtent=function(F,v){return Yd(R,F,v)},R.fitSize=function(F,v){return b9(R,F,v)},R.fitWidth=function(F,v){return w9(R,F,v)},R.fitHeight=function(F,v){return D9(R,F,v)};function q(){var F=so(a,0,0,p,A,u).apply(null,t(d,r)),v=so(a,i-F[0],l-F[1],p,A,u);return g=x0(o,s,n),J=Hd(t,v),G=Hd(g,J),O=_o(J,I),N()}function N(){return X=j=null,R}return function(){return t=e.apply(this,arguments),R.invert=t.invert&&z,q()}}function fn(e){var t=0,a=ue/3,i=Nn(e),l=i(t,a);return l.parallels=function(d){return arguments.length?i(t=d[0]*Xe,a=d[1]*Xe):[t*dt,a*dt]},l}function Fn(e){var t=Te(e);function a(i,l){return[i*t,Se(l)/t]}return a.invert=function(i,l){return[i/t,Yt(l*t)]},a}function Ln(e,t){var a=Se(e),i=(a+Se(t))/2;if(Ne(i)<me)return Fn(e);var l=1+a*(2*i-a),d=ft(l)/i;function r(o,s){var n=ft(l-2*i*Se(s))/i;return[n*Se(o*=i),d-n*Te(o)]}return r.invert=function(o,s){var n=d-s,g=ka(o,Ne(n))*yi(n);return n*i<0&&(g-=ue*yi(o)*yi(n)),[g/i,Yt((l-(o*o+n*n)*i*i)/(2*i))]},r}function vd(){return fn(Ln).scale(155.424).center([0,33.6442])}function Tn(){return vd().parallels([29.5,45.5]).scale(1070).translate([480,250]).rotate([96,0]).center([-.6,38.7])}function Rn(e){var t=e.length;return{point:function(a,i){for(var l=-1;++l<t;)e[l].point(a,i)},sphere:function(){for(var a=-1;++a<t;)e[a].sphere()},lineStart:function(){for(var a=-1;++a<t;)e[a].lineStart()},lineEnd:function(){for(var a=-1;++a<t;)e[a].lineEnd()},polygonStart:function(){for(var a=-1;++a<t;)e[a].polygonStart()},polygonEnd:function(){for(var a=-1;++a<t;)e[a].polygonEnd()}}}function kn(){var e,t,a=Tn(),i,l=vd().rotate([154,0]).center([-2,58.5]).parallels([55,65]),d,r=vd().rotate([157,0]).center([-3,19.9]).parallels([8,18]),o,s,n={point:function(p,A){s=[p,A]}};function g(p){var A=p[0],h=p[1];return s=null,i.point(A,h),s||(d.point(A,h),s)||(o.point(A,h),s)}g.invert=function(p){var A=a.scale(),h=a.translate(),C=(p[0]-h[0])/A,c=(p[1]-h[1])/A;return(c>=.12&&c<.234&&C>=-.425&&C<-.214?l:c>=.166&&c<.234&&C>=-.214&&C<-.115?r:a).invert(p)},g.stream=function(p){return e&&t===p?e:e=Rn([a.stream(t=p),l.stream(p),r.stream(p)])},g.precision=function(p){return arguments.length?(a.precision(p),l.precision(p),r.precision(p),u()):a.precision()},g.scale=function(p){return arguments.length?(a.scale(p),l.scale(p*.35),r.scale(p),g.translate(a.translate())):a.scale()},g.translate=function(p){if(!arguments.length)return a.translate();var A=a.scale(),h=+p[0],C=+p[1];return i=a.translate(p).clipExtent([[h-.455*A,C-.238*A],[h+.455*A,C+.238*A]]).stream(n),d=l.translate([h-.307*A,C+.201*A]).clipExtent([[h-.425*A+me,C+.12*A+me],[h-.214*A-me,C+.234*A-me]]).stream(n),o=r.translate([h-.205*A,C+.212*A]).clipExtent([[h-.214*A+me,C+.166*A+me],[h-.115*A-me,C+.234*A-me]]).stream(n),u()},g.fitExtent=function(p,A){return Yd(g,p,A)},g.fitSize=function(p,A){return b9(g,p,A)},g.fitWidth=function(p,A){return w9(g,p,A)},g.fitHeight=function(p,A){return D9(g,p,A)};function u(){return e=t=null,g}return g.scale(1070)}var In={value:()=>{}};function xd(){for(var e=0,t=arguments.length,a={},i;e<t;++e){if(!(i=arguments[e]+"")||i in a||/[\s.]/.test(i))throw new Error("illegal type: "+i);a[i]=[]}return new hi(a)}function hi(e){this._=e}function vn(e,t){return e.trim().split(/^|\s+/).map(function(a){var i="",l=a.indexOf(".");if(l>=0&&(i=a.slice(l+1),a=a.slice(0,l)),a&&!t.hasOwnProperty(a))throw new Error("unknown type: "+a);return{type:a,name:i}})}hi.prototype=xd.prototype={constructor:hi,on:function(e,t){var a=this._,i=vn(e+"",a),l,d=-1,r=i.length;if(arguments.length<2){for(;++d<r;)if((l=(e=i[d]).type)&&(l=On(a[l],e.name)))return l;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++d<r;)if(l=(e=i[d]).type)a[l]=uo(a[l],e.name,t);else if(t==null)for(l in a)a[l]=uo(a[l],e.name,null);return this},copy:function(){var e={},t=this._;for(var a in t)e[a]=t[a].slice();return new hi(e)},call:function(e,t){if((l=arguments.length-2)>0)for(var a=new Array(l),i=0,l,d;i<l;++i)a[i]=arguments[i+2];if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(d=this._[e],i=0,l=d.length;i<l;++i)d[i].value.apply(t,a)},apply:function(e,t,a){if(!this._.hasOwnProperty(e))throw new Error("unknown type: "+e);for(var i=this._[e],l=0,d=i.length;l<d;++l)i[l].value.apply(t,a)}};function On(e,t){for(var a=0,i=e.length,l;a<i;++a)if((l=e[a]).name===t)return l.value}function uo(e,t,a){for(var i=0,l=e.length;i<l;++i)if(e[i].name===t){e[i]=In,e=e.slice(0,i).concat(e.slice(i+1));break}return a!=null&&e.push({name:t,value:a}),e}var Od="http://www.w3.org/1999/xhtml";const mo={svg:"http://www.w3.org/2000/svg",xhtml:Od,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};function Ei(e){var t=e+="",a=t.indexOf(":");return a>=0&&(t=e.slice(0,a))!=="xmlns"&&(e=e.slice(a+1)),mo.hasOwnProperty(t)?{space:mo[t],local:e}:e}function Pn(e){return function(){var t=this.ownerDocument,a=this.namespaceURI;return a===Od&&t.documentElement.namespaceURI===Od?t.createElement(e):t.createElementNS(a,e)}}function Bn(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}function K9(e){var t=Ei(e);return(t.local?Bn:Pn)(t)}function Wn(){}function Ud(e){return e==null?Wn:function(){return this.querySelector(e)}}function bn(e){typeof e!="function"&&(e=Ud(e));for(var t=this._groups,a=t.length,i=new Array(a),l=0;l<a;++l)for(var d=t[l],r=d.length,o=i[l]=new Array(r),s,n,g=0;g<r;++g)(s=d[g])&&(n=e.call(s,s.__data__,g,d))&&("__data__"in s&&(n.__data__=s.__data__),o[g]=n);return new et(i,this._parents)}function wn(e){return e==null?[]:Array.isArray(e)?e:Array.from(e)}function Dn(){return[]}function X9(e){return e==null?Dn:function(){return this.querySelectorAll(e)}}function Kn(e){return function(){return wn(e.apply(this,arguments))}}function Xn(e){typeof e=="function"?e=Kn(e):e=X9(e);for(var t=this._groups,a=t.length,i=[],l=[],d=0;d<a;++d)for(var r=t[d],o=r.length,s,n=0;n<o;++n)(s=r[n])&&(i.push(e.call(s,s.__data__,n,r)),l.push(s));return new et(i,l)}function E9(e){return function(){return this.matches(e)}}function G9(e){return function(t){return t.matches(e)}}var En=Array.prototype.find;function Gn(e){return function(){return En.call(this.children,e)}}function Vn(){return this.firstElementChild}function Jn(e){return this.select(e==null?Vn:Gn(typeof e=="function"?e:G9(e)))}var Yn=Array.prototype.filter;function xn(){return Array.from(this.children)}function Un(e){return function(){return Yn.call(this.children,e)}}function zn(e){return this.selectAll(e==null?xn:Un(typeof e=="function"?e:G9(e)))}function Zn(e){typeof e!="function"&&(e=E9(e));for(var t=this._groups,a=t.length,i=new Array(a),l=0;l<a;++l)for(var d=t[l],r=d.length,o=i[l]=[],s,n=0;n<r;++n)(s=d[n])&&e.call(s,s.__data__,n,d)&&o.push(s);return new et(i,this._parents)}function V9(e){return new Array(e.length)}function qn(){return new et(this._enter||this._groups.map(V9),this._parents)}function Pi(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}Pi.prototype={constructor:Pi,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};function $n(e){return function(){return e}}function jn(e,t,a,i,l,d){for(var r=0,o,s=t.length,n=d.length;r<n;++r)(o=t[r])?(o.__data__=d[r],i[r]=o):a[r]=new Pi(e,d[r]);for(;r<s;++r)(o=t[r])&&(l[r]=o)}function Qn(e,t,a,i,l,d,r){var o,s,n=new Map,g=t.length,u=d.length,p=new Array(g),A;for(o=0;o<g;++o)(s=t[o])&&(p[o]=A=r.call(s,s.__data__,o,t)+"",n.has(A)?l[o]=s:n.set(A,s));for(o=0;o<u;++o)A=r.call(e,d[o],o,d)+"",(s=n.get(A))?(i[o]=s,s.__data__=d[o],n.delete(A)):a[o]=new Pi(e,d[o]);for(o=0;o<g;++o)(s=t[o])&&n.get(p[o])===s&&(l[o]=s)}function eg(e){return e.__data__}function tg(e,t){if(!arguments.length)return Array.from(this,eg);var a=t?Qn:jn,i=this._parents,l=this._groups;typeof e!="function"&&(e=$n(e));for(var d=l.length,r=new Array(d),o=new Array(d),s=new Array(d),n=0;n<d;++n){var g=i[n],u=l[n],p=u.length,A=ag(e.call(g,g&&g.__data__,n,i)),h=A.length,C=o[n]=new Array(h),c=r[n]=new Array(h),f=s[n]=new Array(p);a(g,u,C,c,f,A,t);for(var L=0,k=0,T,I;L<h;++L)if(T=C[L]){for(L>=k&&(k=L+1);!(I=c[k])&&++k<h;);T._next=I||null}}return r=new et(r,i),r._enter=o,r._exit=s,r}function ag(e){return typeof e=="object"&&"length"in e?e:Array.from(e)}function ig(){return new et(this._exit||this._groups.map(V9),this._parents)}function lg(e,t,a){var i=this.enter(),l=this,d=this.exit();return typeof e=="function"?(i=e(i),i&&(i=i.selection())):i=i.append(e+""),t!=null&&(l=t(l),l&&(l=l.selection())),a==null?d.remove():a(d),i&&l?i.merge(l).order():l}function dg(e){for(var t=e.selection?e.selection():e,a=this._groups,i=t._groups,l=a.length,d=i.length,r=Math.min(l,d),o=new Array(l),s=0;s<r;++s)for(var n=a[s],g=i[s],u=n.length,p=o[s]=new Array(u),A,h=0;h<u;++h)(A=n[h]||g[h])&&(p[h]=A);for(;s<l;++s)o[s]=a[s];return new et(o,this._parents)}function rg(){for(var e=this._groups,t=-1,a=e.length;++t<a;)for(var i=e[t],l=i.length-1,d=i[l],r;--l>=0;)(r=i[l])&&(d&&r.compareDocumentPosition(d)^4&&d.parentNode.insertBefore(r,d),d=r);return this}function og(e){e||(e=ng);function t(u,p){return u&&p?e(u.__data__,p.__data__):!u-!p}for(var a=this._groups,i=a.length,l=new Array(i),d=0;d<i;++d){for(var r=a[d],o=r.length,s=l[d]=new Array(o),n,g=0;g<o;++g)(n=r[g])&&(s[g]=n);s.sort(t)}return new et(l,this._parents).order()}function ng(e,t){return e<t?-1:e>t?1:e>=t?0:NaN}function gg(){var e=arguments[0];return arguments[0]=this,e.apply(null,arguments),this}function pg(){return Array.from(this)}function _g(){for(var e=this._groups,t=0,a=e.length;t<a;++t)for(var i=e[t],l=0,d=i.length;l<d;++l){var r=i[l];if(r)return r}return null}function sg(){let e=0;for(const t of this)++e;return e}function ug(){return!this.node()}function mg(e){for(var t=this._groups,a=0,i=t.length;a<i;++a)for(var l=t[a],d=0,r=l.length,o;d<r;++d)(o=l[d])&&e.call(o,o.__data__,d,l);return this}function yg(e){return function(){this.removeAttribute(e)}}function Ag(e){return function(){this.removeAttributeNS(e.space,e.local)}}function hg(e,t){return function(){this.setAttribute(e,t)}}function cg(e,t){return function(){this.setAttributeNS(e.space,e.local,t)}}function Hg(e,t){return function(){var a=t.apply(this,arguments);a==null?this.removeAttribute(e):this.setAttribute(e,a)}}function Mg(e,t){return function(){var a=t.apply(this,arguments);a==null?this.removeAttributeNS(e.space,e.local):this.setAttributeNS(e.space,e.local,a)}}function Cg(e,t){var a=Ei(e);if(arguments.length<2){var i=this.node();return a.local?i.getAttributeNS(a.space,a.local):i.getAttribute(a)}return this.each((t==null?a.local?Ag:yg:typeof t=="function"?a.local?Mg:Hg:a.local?cg:hg)(a,t))}function J9(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView}function Sg(e){return function(){this.style.removeProperty(e)}}function Ng(e,t,a){return function(){this.style.setProperty(e,t,a)}}function fg(e,t,a){return function(){var i=t.apply(this,arguments);i==null?this.style.removeProperty(e):this.style.setProperty(e,i,a)}}function Fg(e,t,a){return arguments.length>1?this.each((t==null?Sg:typeof t=="function"?fg:Ng)(e,t,a??"")):Oa(this.node(),e)}function Oa(e,t){return e.style.getPropertyValue(t)||J9(e).getComputedStyle(e,null).getPropertyValue(t)}function Lg(e){return function(){delete this[e]}}function Tg(e,t){return function(){this[e]=t}}function Rg(e,t){return function(){var a=t.apply(this,arguments);a==null?delete this[e]:this[e]=a}}function kg(e,t){return arguments.length>1?this.each((t==null?Lg:typeof t=="function"?Rg:Tg)(e,t)):this.node()[e]}function Y9(e){return e.trim().split(/^|\s+/)}function zd(e){return e.classList||new x9(e)}function x9(e){this._node=e,this._names=Y9(e.getAttribute("class")||"")}x9.prototype={add:function(e){var t=this._names.indexOf(e);t<0&&(this._names.push(e),this._node.setAttribute("class",this._names.join(" ")))},remove:function(e){var t=this._names.indexOf(e);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(e){return this._names.indexOf(e)>=0}};function U9(e,t){for(var a=zd(e),i=-1,l=t.length;++i<l;)a.add(t[i])}function z9(e,t){for(var a=zd(e),i=-1,l=t.length;++i<l;)a.remove(t[i])}function Ig(e){return function(){U9(this,e)}}function vg(e){return function(){z9(this,e)}}function Og(e,t){return function(){(t.apply(this,arguments)?U9:z9)(this,e)}}function Pg(e,t){var a=Y9(e+"");if(arguments.length<2){for(var i=zd(this.node()),l=-1,d=a.length;++l<d;)if(!i.contains(a[l]))return!1;return!0}return this.each((typeof t=="function"?Og:t?Ig:vg)(a,t))}function Bg(){this.textContent=""}function Wg(e){return function(){this.textContent=e}}function bg(e){return function(){var t=e.apply(this,arguments);this.textContent=t??""}}function wg(e){return arguments.length?this.each(e==null?Bg:(typeof e=="function"?bg:Wg)(e)):this.node().textContent}function Dg(){this.innerHTML=""}function Kg(e){return function(){this.innerHTML=e}}function Xg(e){return function(){var t=e.apply(this,arguments);this.innerHTML=t??""}}function Eg(e){return arguments.length?this.each(e==null?Dg:(typeof e=="function"?Xg:Kg)(e)):this.node().innerHTML}function Gg(){this.nextSibling&&this.parentNode.appendChild(this)}function Vg(){return this.each(Gg)}function Jg(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}function Yg(){return this.each(Jg)}function xg(e){var t=typeof e=="function"?e:K9(e);return this.select(function(){return this.appendChild(t.apply(this,arguments))})}function Ug(){return null}function zg(e,t){var a=typeof e=="function"?e:K9(e),i=t==null?Ug:typeof t=="function"?t:Ud(t);return this.select(function(){return this.insertBefore(a.apply(this,arguments),i.apply(this,arguments)||null)})}function Zg(){var e=this.parentNode;e&&e.removeChild(this)}function qg(){return this.each(Zg)}function $g(){var e=this.cloneNode(!1),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function jg(){var e=this.cloneNode(!0),t=this.parentNode;return t?t.insertBefore(e,this.nextSibling):e}function Qg(e){return this.select(e?jg:$g)}function ep(e){return arguments.length?this.property("__data__",e):this.node().__data__}function tp(e){return function(t){e.call(this,t,this.__data__)}}function ap(e){return e.trim().split(/^|\s+/).map(function(t){var a="",i=t.indexOf(".");return i>=0&&(a=t.slice(i+1),t=t.slice(0,i)),{type:t,name:a}})}function ip(e){return function(){var t=this.__on;if(t){for(var a=0,i=-1,l=t.length,d;a<l;++a)d=t[a],(!e.type||d.type===e.type)&&d.name===e.name?this.removeEventListener(d.type,d.listener,d.options):t[++i]=d;++i?t.length=i:delete this.__on}}}function lp(e,t,a){return function(){var i=this.__on,l,d=tp(t);if(i){for(var r=0,o=i.length;r<o;++r)if((l=i[r]).type===e.type&&l.name===e.name){this.removeEventListener(l.type,l.listener,l.options),this.addEventListener(l.type,l.listener=d,l.options=a),l.value=t;return}}this.addEventListener(e.type,d,a),l={type:e.type,name:e.name,value:t,listener:d,options:a},i?i.push(l):this.__on=[l]}}function dp(e,t,a){var i=ap(e+""),l,d=i.length,r;if(arguments.length<2){var o=this.node().__on;if(o){for(var s=0,n=o.length,g;s<n;++s)for(l=0,g=o[s];l<d;++l)if((r=i[l]).type===g.type&&r.name===g.name)return g.value}return}for(o=t?lp:ip,l=0;l<d;++l)this.each(o(i[l],t,a));return this}function Z9(e,t,a){var i=J9(e),l=i.CustomEvent;typeof l=="function"?l=new l(t,a):(l=i.document.createEvent("Event"),a?(l.initEvent(t,a.bubbles,a.cancelable),l.detail=a.detail):l.initEvent(t,!1,!1)),e.dispatchEvent(l)}function rp(e,t){return function(){return Z9(this,e,t)}}function op(e,t){return function(){return Z9(this,e,t.apply(this,arguments))}}function np(e,t){return this.each((typeof t=="function"?op:rp)(e,t))}function*gp(){for(var e=this._groups,t=0,a=e.length;t<a;++t)for(var i=e[t],l=0,d=i.length,r;l<d;++l)(r=i[l])&&(yield r)}var q9=[null];function et(e,t){this._groups=e,this._parents=t}function qa(){return new et([[document.documentElement]],q9)}function pp(){return this}et.prototype=qa.prototype={constructor:et,select:bn,selectAll:Xn,selectChild:Jn,selectChildren:zn,filter:Zn,data:tg,enter:qn,exit:ig,join:lg,merge:dg,selection:pp,order:rg,sort:og,call:gg,nodes:pg,node:_g,size:sg,empty:ug,each:mg,attr:Cg,style:Fg,property:kg,classed:Pg,text:wg,html:Eg,raise:Vg,lower:Yg,append:xg,insert:zg,remove:qg,clone:Qg,datum:ep,on:dp,dispatch:np,[Symbol.iterator]:gp};function St(e){return typeof e=="string"?new et([[document.querySelector(e)]],[document.documentElement]):new et([[e]],q9)}function _p(e){let t;for(;t=e.sourceEvent;)e=t;return e}function Xt(e,t){if(e=_p(e),t===void 0&&(t=e.currentTarget),t){var a=t.ownerSVGElement||t;if(a.createSVGPoint){var i=a.createSVGPoint();return i.x=e.clientX,i.y=e.clientY,i=i.matrixTransform(t.getScreenCTM().inverse()),[i.x,i.y]}if(t.getBoundingClientRect){var l=t.getBoundingClientRect();return[e.clientX-l.left-t.clientLeft,e.clientY-l.top-t.clientTop]}}return[e.pageX,e.pageY]}const Pd={capture:!0,passive:!1};function Bd(e){e.preventDefault(),e.stopImmediatePropagation()}function sp(e){var t=e.document.documentElement,a=St(e).on("dragstart.drag",Bd,Pd);"onselectstart"in t?a.on("selectstart.drag",Bd,Pd):(t.__noselect=t.style.MozUserSelect,t.style.MozUserSelect="none")}function up(e,t){var a=e.document.documentElement,i=St(e).on("dragstart.drag",null);t&&(i.on("click.drag",Bd,Pd),setTimeout(function(){i.on("click.drag",null)},0)),"onselectstart"in a?i.on("selectstart.drag",null):(a.style.MozUserSelect=a.__noselect,delete a.__noselect)}function Zd(e,t,a){e.prototype=t.prototype=a,a.constructor=e}function $9(e,t){var a=Object.create(e.prototype);for(var i in t)a[i]=t[i];return a}function $a(){}var Ua=.7,Bi=1/Ua,Ra="\\s*([+-]?\\d+)\\s*",za="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",ct="\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",mp=/^#([0-9a-f]{3,8})$/,yp=new RegExp(`^rgb\\(${Ra},${Ra},${Ra}\\)$`),Ap=new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`),hp=new RegExp(`^rgba\\(${Ra},${Ra},${Ra},${za}\\)$`),cp=new RegExp(`^rgba\\(${ct},${ct},${ct},${za}\\)$`),Hp=new RegExp(`^hsl\\(${za},${ct},${ct}\\)$`),Mp=new RegExp(`^hsla\\(${za},${ct},${ct},${za}\\)$`),yo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Zd($a,Ut,{copy(e){return Object.assign(new this.constructor,this,e)},displayable(){return this.rgb().displayable()},hex:Ao,formatHex:Ao,formatHex8:Cp,formatHsl:Sp,formatRgb:ho,toString:ho});function Ao(){return this.rgb().formatHex()}function Cp(){return this.rgb().formatHex8()}function Sp(){return j9(this).formatHsl()}function ho(){return this.rgb().formatRgb()}function Ut(e){var t,a;return e=(e+"").trim().toLowerCase(),(t=mp.exec(e))?(a=t[1].length,t=parseInt(t[1],16),a===6?co(t):a===3?new Ge(t>>8&15|t>>4&240,t>>4&15|t&240,(t&15)<<4|t&15,1):a===8?ni(t>>24&255,t>>16&255,t>>8&255,(t&255)/255):a===4?ni(t>>12&15|t>>8&240,t>>8&15|t>>4&240,t>>4&15|t&240,((t&15)<<4|t&15)/255):null):(t=yp.exec(e))?new Ge(t[1],t[2],t[3],1):(t=Ap.exec(e))?new Ge(t[1]*255/100,t[2]*255/100,t[3]*255/100,1):(t=hp.exec(e))?ni(t[1],t[2],t[3],t[4]):(t=cp.exec(e))?ni(t[1]*255/100,t[2]*255/100,t[3]*255/100,t[4]):(t=Hp.exec(e))?Co(t[1],t[2]/100,t[3]/100,1):(t=Mp.exec(e))?Co(t[1],t[2]/100,t[3]/100,t[4]):yo.hasOwnProperty(e)?co(yo[e]):e==="transparent"?new Ge(NaN,NaN,NaN,0):null}function co(e){return new Ge(e>>16&255,e>>8&255,e&255,1)}function ni(e,t,a,i){return i<=0&&(e=t=a=NaN),new Ge(e,t,a,i)}function Np(e){return e instanceof $a||(e=Ut(e)),e?(e=e.rgb(),new Ge(e.r,e.g,e.b,e.opacity)):new Ge}function Wd(e,t,a,i){return arguments.length===1?Np(e):new Ge(e,t,a,i??1)}function Ge(e,t,a,i){this.r=+e,this.g=+t,this.b=+a,this.opacity=+i}Zd(Ge,Wd,$9($a,{brighter(e){return e=e==null?Bi:Math.pow(Bi,e),new Ge(this.r*e,this.g*e,this.b*e,this.opacity)},darker(e){return e=e==null?Ua:Math.pow(Ua,e),new Ge(this.r*e,this.g*e,this.b*e,this.opacity)},rgb(){return this},clamp(){return new Ge(Gt(this.r),Gt(this.g),Gt(this.b),Wi(this.opacity))},displayable(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:Ho,formatHex:Ho,formatHex8:fp,formatRgb:Mo,toString:Mo}));function Ho(){return`#${Et(this.r)}${Et(this.g)}${Et(this.b)}`}function fp(){return`#${Et(this.r)}${Et(this.g)}${Et(this.b)}${Et((isNaN(this.opacity)?1:this.opacity)*255)}`}function Mo(){const e=Wi(this.opacity);return`${e===1?"rgb(":"rgba("}${Gt(this.r)}, ${Gt(this.g)}, ${Gt(this.b)}${e===1?")":`, ${e})`}`}function Wi(e){return isNaN(e)?1:Math.max(0,Math.min(1,e))}function Gt(e){return Math.max(0,Math.min(255,Math.round(e)||0))}function Et(e){return e=Gt(e),(e<16?"0":"")+e.toString(16)}function Co(e,t,a,i){return i<=0?e=t=a=NaN:a<=0||a>=1?e=t=NaN:t<=0&&(e=NaN),new nt(e,t,a,i)}function j9(e){if(e instanceof nt)return new nt(e.h,e.s,e.l,e.opacity);if(e instanceof $a||(e=Ut(e)),!e)return new nt;if(e instanceof nt)return e;e=e.rgb();var t=e.r/255,a=e.g/255,i=e.b/255,l=Math.min(t,a,i),d=Math.max(t,a,i),r=NaN,o=d-l,s=(d+l)/2;return o?(t===d?r=(a-i)/o+(a<i)*6:a===d?r=(i-t)/o+2:r=(t-a)/o+4,o/=s<.5?d+l:2-d-l,r*=60):o=s>0&&s<1?0:r,new nt(r,o,s,e.opacity)}function Fp(e,t,a,i){return arguments.length===1?j9(e):new nt(e,t,a,i??1)}function nt(e,t,a,i){this.h=+e,this.s=+t,this.l=+a,this.opacity=+i}Zd(nt,Fp,$9($a,{brighter(e){return e=e==null?Bi:Math.pow(Bi,e),new nt(this.h,this.s,this.l*e,this.opacity)},darker(e){return e=e==null?Ua:Math.pow(Ua,e),new nt(this.h,this.s,this.l*e,this.opacity)},rgb(){var e=this.h%360+(this.h<0)*360,t=isNaN(e)||isNaN(this.s)?0:this.s,a=this.l,i=a+(a<.5?a:1-a)*t,l=2*a-i;return new Ge(gd(e>=240?e-240:e+120,l,i),gd(e,l,i),gd(e<120?e+240:e-120,l,i),this.opacity)},clamp(){return new nt(So(this.h),gi(this.s),gi(this.l),Wi(this.opacity))},displayable(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl(){const e=Wi(this.opacity);return`${e===1?"hsl(":"hsla("}${So(this.h)}, ${gi(this.s)*100}%, ${gi(this.l)*100}%${e===1?")":`, ${e})`}`}}));function So(e){return e=(e||0)%360,e<0?e+360:e}function gi(e){return Math.max(0,Math.min(1,e||0))}function gd(e,t,a){return(e<60?t+(a-t)*e/60:e<180?a:e<240?t+(a-t)*(240-e)/60:t)*255}const qd=e=>()=>e;function Lp(e,t){return function(a){return e+a*t}}function Tp(e,t,a){return e=Math.pow(e,a),t=Math.pow(t,a)-e,a=1/a,function(i){return Math.pow(e+i*t,a)}}function Rp(e){return(e=+e)==1?Q9:function(t,a){return a-t?Tp(t,a,e):qd(isNaN(t)?a:t)}}function Q9(e,t){var a=t-e;return a?Lp(e,a):qd(isNaN(e)?t:e)}const Vt=function e(t){var a=Rp(t);function i(l,d){var r=a((l=Wd(l)).r,(d=Wd(d)).r),o=a(l.g,d.g),s=a(l.b,d.b),n=Q9(l.opacity,d.opacity);return function(g){return l.r=r(g),l.g=o(g),l.b=s(g),l.opacity=n(g),l+""}}return i.gamma=e,i}(1);function kp(e,t){t||(t=[]);var a=e?Math.min(t.length,e.length):0,i=t.slice(),l;return function(d){for(l=0;l<a;++l)i[l]=e[l]*(1-d)+t[l]*d;return i}}function Ip(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function vp(e,t){var a=t?t.length:0,i=e?Math.min(a,e.length):0,l=new Array(i),d=new Array(a),r;for(r=0;r<i;++r)l[r]=$d(e[r],t[r]);for(;r<a;++r)d[r]=t[r];return function(o){for(r=0;r<i;++r)d[r]=l[r](o);return d}}function Op(e,t){var a=new Date;return e=+e,t=+t,function(i){return a.setTime(e*(1-i)+t*i),a}}function rt(e,t){return e=+e,t=+t,function(a){return e*(1-a)+t*a}}function Pp(e,t){var a={},i={},l;(e===null||typeof e!="object")&&(e={}),(t===null||typeof t!="object")&&(t={});for(l in t)l in e?a[l]=$d(e[l],t[l]):i[l]=t[l];return function(d){for(l in a)i[l]=a[l](d);return i}}var bd=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,pd=new RegExp(bd.source,"g");function Bp(e){return function(){return e}}function Wp(e){return function(t){return e(t)+""}}function e0(e,t){var a=bd.lastIndex=pd.lastIndex=0,i,l,d,r=-1,o=[],s=[];for(e=e+"",t=t+"";(i=bd.exec(e))&&(l=pd.exec(t));)(d=l.index)>a&&(d=t.slice(a,d),o[r]?o[r]+=d:o[++r]=d),(i=i[0])===(l=l[0])?o[r]?o[r]+=l:o[++r]=l:(o[++r]=null,s.push({i:r,x:rt(i,l)})),a=pd.lastIndex;return a<t.length&&(d=t.slice(a),o[r]?o[r]+=d:o[++r]=d),o.length<2?s[0]?Wp(s[0].x):Bp(t):(t=s.length,function(n){for(var g=0,u;g<t;++g)o[(u=s[g]).i]=u.x(n);return o.join("")})}function $d(e,t){var a=typeof t,i;return t==null||a==="boolean"?qd(t):(a==="number"?rt:a==="string"?(i=Ut(t))?(t=i,Vt):e0:t instanceof Ut?Vt:t instanceof Date?Op:Ip(t)?kp:Array.isArray(t)?vp:typeof t.valueOf!="function"&&typeof t.toString!="function"||isNaN(t)?Pp:rt)(e,t)}function bp(e,t){return e=+e,t=+t,function(a){return Math.round(e*(1-a)+t*a)}}var No=180/Math.PI,wd={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};function t0(e,t,a,i,l,d){var r,o,s;return(r=Math.sqrt(e*e+t*t))&&(e/=r,t/=r),(s=e*a+t*i)&&(a-=e*s,i-=t*s),(o=Math.sqrt(a*a+i*i))&&(a/=o,i/=o,s/=o),e*i<t*a&&(e=-e,t=-t,s=-s,r=-r),{translateX:l,translateY:d,rotate:Math.atan2(t,e)*No,skewX:Math.atan(s)*No,scaleX:r,scaleY:o}}var pi;function wp(e){const t=new(typeof DOMMatrix=="function"?DOMMatrix:WebKitCSSMatrix)(e+"");return t.isIdentity?wd:t0(t.a,t.b,t.c,t.d,t.e,t.f)}function Dp(e){return e==null||(pi||(pi=document.createElementNS("http://www.w3.org/2000/svg","g")),pi.setAttribute("transform",e),!(e=pi.transform.baseVal.consolidate()))?wd:(e=e.matrix,t0(e.a,e.b,e.c,e.d,e.e,e.f))}function a0(e,t,a,i){function l(n){return n.length?n.pop()+" ":""}function d(n,g,u,p,A,h){if(n!==u||g!==p){var C=A.push("translate(",null,t,null,a);h.push({i:C-4,x:rt(n,u)},{i:C-2,x:rt(g,p)})}else(u||p)&&A.push("translate("+u+t+p+a)}function r(n,g,u,p){n!==g?(n-g>180?g+=360:g-n>180&&(n+=360),p.push({i:u.push(l(u)+"rotate(",null,i)-2,x:rt(n,g)})):g&&u.push(l(u)+"rotate("+g+i)}function o(n,g,u,p){n!==g?p.push({i:u.push(l(u)+"skewX(",null,i)-2,x:rt(n,g)}):g&&u.push(l(u)+"skewX("+g+i)}function s(n,g,u,p,A,h){if(n!==u||g!==p){var C=A.push(l(A)+"scale(",null,",",null,")");h.push({i:C-4,x:rt(n,u)},{i:C-2,x:rt(g,p)})}else(u!==1||p!==1)&&A.push(l(A)+"scale("+u+","+p+")")}return function(n,g){var u=[],p=[];return n=e(n),g=e(g),d(n.translateX,n.translateY,g.translateX,g.translateY,u,p),r(n.rotate,g.rotate,u,p),o(n.skewX,g.skewX,u,p),s(n.scaleX,n.scaleY,g.scaleX,g.scaleY,u,p),n=g=null,function(A){for(var h=-1,C=p.length,c;++h<C;)u[(c=p[h]).i]=c.x(A);return u.join("")}}}var Kp=a0(wp,"px, ","px)","deg)"),Xp=a0(Dp,", ",")",")"),Ep=1e-12;function fo(e){return((e=Math.exp(e))+1/e)/2}function Gp(e){return((e=Math.exp(e))-1/e)/2}function Vp(e){return((e=Math.exp(2*e))-1)/(e+1)}const Jp=function e(t,a,i){function l(d,r){var o=d[0],s=d[1],n=d[2],g=r[0],u=r[1],p=r[2],A=g-o,h=u-s,C=A*A+h*h,c,f;if(C<Ep)f=Math.log(p/n)/t,c=function(J){return[o+J*A,s+J*h,n*Math.exp(t*J*f)]};else{var L=Math.sqrt(C),k=(p*p-n*n+i*C)/(2*n*a*L),T=(p*p-n*n-i*C)/(2*p*a*L),I=Math.log(Math.sqrt(k*k+1)-k),O=Math.log(Math.sqrt(T*T+1)-T);f=(O-I)/t,c=function(J){var G=J*f,X=fo(I),j=n/(a*L)*(X*Vp(t*G+I)-Gp(I));return[o+j*A,s+j*h,n*X/fo(t*G+I)]}}return c.duration=f*1e3*t/Math.SQRT2,c}return l.rho=function(d){var r=Math.max(.001,+d),o=r*r,s=o*o;return e(r,o,s)},l}(Math.SQRT2,2,4);var Pa=0,Ja=0,ba=0,i0=1e3,bi,Ya,wi=0,zt=0,Gi=0,Za=typeof performance=="object"&&performance.now?performance:Date,l0=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(e){setTimeout(e,17)};function jd(){return zt||(l0(Yp),zt=Za.now()+Gi)}function Yp(){zt=0}function Di(){this._call=this._time=this._next=null}Di.prototype=d0.prototype={constructor:Di,restart:function(e,t,a){if(typeof e!="function")throw new TypeError("callback is not a function");a=(a==null?jd():+a)+(t==null?0:+t),!this._next&&Ya!==this&&(Ya?Ya._next=this:bi=this,Ya=this),this._call=e,this._time=a,Dd()},stop:function(){this._call&&(this._call=null,this._time=1/0,Dd())}};function d0(e,t,a){var i=new Di;return i.restart(e,t,a),i}function xp(){jd(),++Pa;for(var e=bi,t;e;)(t=zt-e._time)>=0&&e._call.call(void 0,t),e=e._next;--Pa}function Fo(){zt=(wi=Za.now())+Gi,Pa=Ja=0;try{xp()}finally{Pa=0,zp(),zt=0}}function Up(){var e=Za.now(),t=e-wi;t>i0&&(Gi-=t,wi=e)}function zp(){for(var e,t=bi,a,i=1/0;t;)t._call?(i>t._time&&(i=t._time),e=t,t=t._next):(a=t._next,t._next=null,t=e?e._next=a:bi=a);Ya=e,Dd(i)}function Dd(e){if(!Pa){Ja&&(Ja=clearTimeout(Ja));var t=e-zt;t>24?(e<1/0&&(Ja=setTimeout(Fo,e-Za.now()-Gi)),ba&&(ba=clearInterval(ba))):(ba||(wi=Za.now(),ba=setInterval(Up,i0)),Pa=1,l0(Fo))}}function Lo(e,t,a){var i=new Di;return t=t==null?0:+t,i.restart(l=>{i.stop(),e(l+t)},t,a),i}var Zp=xd("start","end","cancel","interrupt"),qp=[],r0=0,To=1,Kd=2,ci=3,Ro=4,Xd=5,Hi=6;function Vi(e,t,a,i,l,d){var r=e.__transition;if(!r)e.__transition={};else if(a in r)return;$p(e,a,{name:t,index:i,group:l,on:Zp,tween:qp,time:d.time,delay:d.delay,duration:d.duration,ease:d.ease,timer:null,state:r0})}function Qd(e,t){var a=gt(e,t);if(a.state>r0)throw new Error("too late; already scheduled");return a}function Ht(e,t){var a=gt(e,t);if(a.state>ci)throw new Error("too late; already running");return a}function gt(e,t){var a=e.__transition;if(!a||!(a=a[t]))throw new Error("transition not found");return a}function $p(e,t,a){var i=e.__transition,l;i[t]=a,a.timer=d0(d,0,a.time);function d(n){a.state=To,a.timer.restart(r,a.delay,a.time),a.delay<=n&&r(n-a.delay)}function r(n){var g,u,p,A;if(a.state!==To)return s();for(g in i)if(A=i[g],A.name===a.name){if(A.state===ci)return Lo(r);A.state===Ro?(A.state=Hi,A.timer.stop(),A.on.call("interrupt",e,e.__data__,A.index,A.group),delete i[g]):+g<t&&(A.state=Hi,A.timer.stop(),A.on.call("cancel",e,e.__data__,A.index,A.group),delete i[g])}if(Lo(function(){a.state===ci&&(a.state=Ro,a.timer.restart(o,a.delay,a.time),o(n))}),a.state=Kd,a.on.call("start",e,e.__data__,a.index,a.group),a.state===Kd){for(a.state=ci,l=new Array(p=a.tween.length),g=0,u=-1;g<p;++g)(A=a.tween[g].value.call(e,e.__data__,a.index,a.group))&&(l[++u]=A);l.length=u+1}}function o(n){for(var g=n<a.duration?a.ease.call(null,n/a.duration):(a.timer.restart(s),a.state=Xd,1),u=-1,p=l.length;++u<p;)l[u].call(e,g);a.state===Xd&&(a.on.call("end",e,e.__data__,a.index,a.group),s())}function s(){a.state=Hi,a.timer.stop(),delete i[t];for(var n in i)return;delete e.__transition}}function Mi(e,t){var a=e.__transition,i,l,d=!0,r;if(a){t=t==null?null:t+"";for(r in a){if((i=a[r]).name!==t){d=!1;continue}l=i.state>Kd&&i.state<Xd,i.state=Hi,i.timer.stop(),i.on.call(l?"interrupt":"cancel",e,e.__data__,i.index,i.group),delete a[r]}d&&delete e.__transition}}function jp(e){return this.each(function(){Mi(this,e)})}function Qp(e,t){var a,i;return function(){var l=Ht(this,e),d=l.tween;if(d!==a){i=a=d;for(var r=0,o=i.length;r<o;++r)if(i[r].name===t){i=i.slice(),i.splice(r,1);break}}l.tween=i}}function e1(e,t,a){var i,l;if(typeof a!="function")throw new Error;return function(){var d=Ht(this,e),r=d.tween;if(r!==i){l=(i=r).slice();for(var o={name:t,value:a},s=0,n=l.length;s<n;++s)if(l[s].name===t){l[s]=o;break}s===n&&l.push(o)}d.tween=l}}function t1(e,t){var a=this._id;if(e+="",arguments.length<2){for(var i=gt(this.node(),a).tween,l=0,d=i.length,r;l<d;++l)if((r=i[l]).name===e)return r.value;return null}return this.each((t==null?Qp:e1)(a,e,t))}function er(e,t,a){var i=e._id;return e.each(function(){var l=Ht(this,i);(l.value||(l.value={}))[t]=a.apply(this,arguments)}),function(l){return gt(l,i).value[t]}}function o0(e,t){var a;return(typeof t=="number"?rt:t instanceof Ut?Vt:(a=Ut(t))?(t=a,Vt):e0)(e,t)}function a1(e){return function(){this.removeAttribute(e)}}function i1(e){return function(){this.removeAttributeNS(e.space,e.local)}}function l1(e,t,a){var i,l=a+"",d;return function(){var r=this.getAttribute(e);return r===l?null:r===i?d:d=t(i=r,a)}}function d1(e,t,a){var i,l=a+"",d;return function(){var r=this.getAttributeNS(e.space,e.local);return r===l?null:r===i?d:d=t(i=r,a)}}function r1(e,t,a){var i,l,d;return function(){var r,o=a(this),s;return o==null?void this.removeAttribute(e):(r=this.getAttribute(e),s=o+"",r===s?null:r===i&&s===l?d:(l=s,d=t(i=r,o)))}}function o1(e,t,a){var i,l,d;return function(){var r,o=a(this),s;return o==null?void this.removeAttributeNS(e.space,e.local):(r=this.getAttributeNS(e.space,e.local),s=o+"",r===s?null:r===i&&s===l?d:(l=s,d=t(i=r,o)))}}function n1(e,t){var a=Ei(e),i=a==="transform"?Xp:o0;return this.attrTween(e,typeof t=="function"?(a.local?o1:r1)(a,i,er(this,"attr."+e,t)):t==null?(a.local?i1:a1)(a):(a.local?d1:l1)(a,i,t))}function g1(e,t){return function(a){this.setAttribute(e,t.call(this,a))}}function p1(e,t){return function(a){this.setAttributeNS(e.space,e.local,t.call(this,a))}}function _1(e,t){var a,i;function l(){var d=t.apply(this,arguments);return d!==i&&(a=(i=d)&&p1(e,d)),a}return l._value=t,l}function s1(e,t){var a,i;function l(){var d=t.apply(this,arguments);return d!==i&&(a=(i=d)&&g1(e,d)),a}return l._value=t,l}function u1(e,t){var a="attr."+e;if(arguments.length<2)return(a=this.tween(a))&&a._value;if(t==null)return this.tween(a,null);if(typeof t!="function")throw new Error;var i=Ei(e);return this.tween(a,(i.local?_1:s1)(i,t))}function m1(e,t){return function(){Qd(this,e).delay=+t.apply(this,arguments)}}function y1(e,t){return t=+t,function(){Qd(this,e).delay=t}}function A1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?m1:y1)(t,e)):gt(this.node(),t).delay}function h1(e,t){return function(){Ht(this,e).duration=+t.apply(this,arguments)}}function c1(e,t){return t=+t,function(){Ht(this,e).duration=t}}function H1(e){var t=this._id;return arguments.length?this.each((typeof e=="function"?h1:c1)(t,e)):gt(this.node(),t).duration}function M1(e,t){if(typeof t!="function")throw new Error;return function(){Ht(this,e).ease=t}}function C1(e){var t=this._id;return arguments.length?this.each(M1(t,e)):gt(this.node(),t).ease}function S1(e,t){return function(){var a=t.apply(this,arguments);if(typeof a!="function")throw new Error;Ht(this,e).ease=a}}function N1(e){if(typeof e!="function")throw new Error;return this.each(S1(this._id,e))}function f1(e){typeof e!="function"&&(e=E9(e));for(var t=this._groups,a=t.length,i=new Array(a),l=0;l<a;++l)for(var d=t[l],r=d.length,o=i[l]=[],s,n=0;n<r;++n)(s=d[n])&&e.call(s,s.__data__,n,d)&&o.push(s);return new Ft(i,this._parents,this._name,this._id)}function F1(e){if(e._id!==this._id)throw new Error;for(var t=this._groups,a=e._groups,i=t.length,l=a.length,d=Math.min(i,l),r=new Array(i),o=0;o<d;++o)for(var s=t[o],n=a[o],g=s.length,u=r[o]=new Array(g),p,A=0;A<g;++A)(p=s[A]||n[A])&&(u[A]=p);for(;o<i;++o)r[o]=t[o];return new Ft(r,this._parents,this._name,this._id)}function L1(e){return(e+"").trim().split(/^|\s+/).every(function(t){var a=t.indexOf(".");return a>=0&&(t=t.slice(0,a)),!t||t==="start"})}function T1(e,t,a){var i,l,d=L1(t)?Qd:Ht;return function(){var r=d(this,e),o=r.on;o!==i&&(l=(i=o).copy()).on(t,a),r.on=l}}function R1(e,t){var a=this._id;return arguments.length<2?gt(this.node(),a).on.on(e):this.each(T1(a,e,t))}function k1(e){return function(){var t=this.parentNode;for(var a in this.__transition)if(+a!==e)return;t&&t.removeChild(this)}}function I1(){return this.on("end.remove",k1(this._id))}function v1(e){var t=this._name,a=this._id;typeof e!="function"&&(e=Ud(e));for(var i=this._groups,l=i.length,d=new Array(l),r=0;r<l;++r)for(var o=i[r],s=o.length,n=d[r]=new Array(s),g,u,p=0;p<s;++p)(g=o[p])&&(u=e.call(g,g.__data__,p,o))&&("__data__"in g&&(u.__data__=g.__data__),n[p]=u,Vi(n[p],t,a,p,n,gt(g,a)));return new Ft(d,this._parents,t,a)}function O1(e){var t=this._name,a=this._id;typeof e!="function"&&(e=X9(e));for(var i=this._groups,l=i.length,d=[],r=[],o=0;o<l;++o)for(var s=i[o],n=s.length,g,u=0;u<n;++u)if(g=s[u]){for(var p=e.call(g,g.__data__,u,s),A,h=gt(g,a),C=0,c=p.length;C<c;++C)(A=p[C])&&Vi(A,t,a,C,p,h);d.push(p),r.push(g)}return new Ft(d,r,t,a)}var P1=qa.prototype.constructor;function B1(){return new P1(this._groups,this._parents)}function W1(e,t){var a,i,l;return function(){var d=Oa(this,e),r=(this.style.removeProperty(e),Oa(this,e));return d===r?null:d===a&&r===i?l:l=t(a=d,i=r)}}function n0(e){return function(){this.style.removeProperty(e)}}function b1(e,t,a){var i,l=a+"",d;return function(){var r=Oa(this,e);return r===l?null:r===i?d:d=t(i=r,a)}}function w1(e,t,a){var i,l,d;return function(){var r=Oa(this,e),o=a(this),s=o+"";return o==null&&(s=o=(this.style.removeProperty(e),Oa(this,e))),r===s?null:r===i&&s===l?d:(l=s,d=t(i=r,o))}}function D1(e,t){var a,i,l,d="style."+t,r="end."+d,o;return function(){var s=Ht(this,e),n=s.on,g=s.value[d]==null?o||(o=n0(t)):void 0;(n!==a||l!==g)&&(i=(a=n).copy()).on(r,l=g),s.on=i}}function K1(e,t,a){var i=(e+="")=="transform"?Kp:o0;return t==null?this.styleTween(e,W1(e,i)).on("end.style."+e,n0(e)):typeof t=="function"?this.styleTween(e,w1(e,i,er(this,"style."+e,t))).each(D1(this._id,e)):this.styleTween(e,b1(e,i,t),a).on("end.style."+e,null)}function X1(e,t,a){return function(i){this.style.setProperty(e,t.call(this,i),a)}}function E1(e,t,a){var i,l;function d(){var r=t.apply(this,arguments);return r!==l&&(i=(l=r)&&X1(e,r,a)),i}return d._value=t,d}function G1(e,t,a){var i="style."+(e+="");if(arguments.length<2)return(i=this.tween(i))&&i._value;if(t==null)return this.tween(i,null);if(typeof t!="function")throw new Error;return this.tween(i,E1(e,t,a??""))}function V1(e){return function(){this.textContent=e}}function J1(e){return function(){var t=e(this);this.textContent=t??""}}function Y1(e){return this.tween("text",typeof e=="function"?J1(er(this,"text",e)):V1(e==null?"":e+""))}function x1(e){return function(t){this.textContent=e.call(this,t)}}function U1(e){var t,a;function i(){var l=e.apply(this,arguments);return l!==a&&(t=(a=l)&&x1(l)),t}return i._value=e,i}function z1(e){var t="text";if(arguments.length<1)return(t=this.tween(t))&&t._value;if(e==null)return this.tween(t,null);if(typeof e!="function")throw new Error;return this.tween(t,U1(e))}function Z1(){for(var e=this._name,t=this._id,a=g0(),i=this._groups,l=i.length,d=0;d<l;++d)for(var r=i[d],o=r.length,s,n=0;n<o;++n)if(s=r[n]){var g=gt(s,t);Vi(s,e,a,n,r,{time:g.time+g.delay+g.duration,delay:0,duration:g.duration,ease:g.ease})}return new Ft(i,this._parents,e,a)}function q1(){var e,t,a=this,i=a._id,l=a.size();return new Promise(function(d,r){var o={value:r},s={value:function(){--l===0&&d()}};a.each(function(){var n=Ht(this,i),g=n.on;g!==e&&(t=(e=g).copy(),t._.cancel.push(o),t._.interrupt.push(o),t._.end.push(s)),n.on=t}),l===0&&d()})}var $1=0;function Ft(e,t,a,i){this._groups=e,this._parents=t,this._name=a,this._id=i}function g0(){return++$1}var Ct=qa.prototype;Ft.prototype={constructor:Ft,select:v1,selectAll:O1,selectChild:Ct.selectChild,selectChildren:Ct.selectChildren,filter:f1,merge:F1,selection:B1,transition:Z1,call:Ct.call,nodes:Ct.nodes,node:Ct.node,size:Ct.size,empty:Ct.empty,each:Ct.each,on:R1,attr:n1,attrTween:u1,style:K1,styleTween:G1,text:Y1,textTween:z1,remove:I1,tween:t1,delay:A1,duration:H1,ease:C1,easeVarying:N1,end:q1,[Symbol.iterator]:Ct[Symbol.iterator]};function j1(e){return((e*=2)<=1?e*e*e:(e-=2)*e*e+2)/2}var Q1={time:null,delay:0,duration:250,ease:j1};function e3(e,t){for(var a;!(a=e.__transition)||!(a=a[t]);)if(!(e=e.parentNode))throw new Error(`transition ${t} not found`);return a}function t3(e){var t,a;e instanceof Ft?(t=e._id,e=e._name):(t=g0(),(a=Q1).time=jd(),e=e==null?null:e+"");for(var i=this._groups,l=i.length,d=0;d<l;++d)for(var r=i[d],o=r.length,s,n=0;n<o;++n)(s=r[n])&&Vi(s,e,t,n,r,a||e3(s,t));return new Ft(i,this._parents,e,t)}qa.prototype.interrupt=jp;qa.prototype.transition=t3;var ko={},_d={},sd=34,wa=10,ud=13;function p0(e){return new Function("d","return {"+e.map(function(t,a){return JSON.stringify(t)+": d["+a+'] || ""'}).join(",")+"}")}function a3(e,t){var a=p0(e);return function(i,l){return t(a(i),l,e)}}function Io(e){var t=Object.create(null),a=[];return e.forEach(function(i){for(var l in i)l in t||a.push(t[l]=l)}),a}function Ee(e,t){var a=e+"",i=a.length;return i<t?new Array(t-i+1).join(0)+a:a}function i3(e){return e<0?"-"+Ee(-e,6):e>9999?"+"+Ee(e,6):Ee(e,4)}function l3(e){var t=e.getUTCHours(),a=e.getUTCMinutes(),i=e.getUTCSeconds(),l=e.getUTCMilliseconds();return isNaN(e)?"Invalid Date":i3(e.getUTCFullYear())+"-"+Ee(e.getUTCMonth()+1,2)+"-"+Ee(e.getUTCDate(),2)+(l?"T"+Ee(t,2)+":"+Ee(a,2)+":"+Ee(i,2)+"."+Ee(l,3)+"Z":i?"T"+Ee(t,2)+":"+Ee(a,2)+":"+Ee(i,2)+"Z":a||t?"T"+Ee(t,2)+":"+Ee(a,2)+"Z":"")}function d3(e){var t=new RegExp('["'+e+`
\r]`),a=e.charCodeAt(0);function i(u,p){var A,h,C=l(u,function(c,f){if(A)return A(c,f-1);h=c,A=p?a3(c,p):p0(c)});return C.columns=h||[],C}function l(u,p){var A=[],h=u.length,C=0,c=0,f,L=h<=0,k=!1;u.charCodeAt(h-1)===wa&&--h,u.charCodeAt(h-1)===ud&&--h;function T(){if(L)return _d;if(k)return k=!1,ko;var O,J=C,G;if(u.charCodeAt(J)===sd){for(;C++<h&&u.charCodeAt(C)!==sd||u.charCodeAt(++C)===sd;);return(O=C)>=h?L=!0:(G=u.charCodeAt(C++))===wa?k=!0:G===ud&&(k=!0,u.charCodeAt(C)===wa&&++C),u.slice(J+1,O-1).replace(/""/g,'"')}for(;C<h;){if((G=u.charCodeAt(O=C++))===wa)k=!0;else if(G===ud)k=!0,u.charCodeAt(C)===wa&&++C;else if(G!==a)continue;return u.slice(J,O)}return L=!0,u.slice(J,h)}for(;(f=T())!==_d;){for(var I=[];f!==ko&&f!==_d;)I.push(f),f=T();p&&(I=p(I,c++))==null||A.push(I)}return A}function d(u,p){return u.map(function(A){return p.map(function(h){return g(A[h])}).join(e)})}function r(u,p){return p==null&&(p=Io(u)),[p.map(g).join(e)].concat(d(u,p)).join(`
`)}function o(u,p){return p==null&&(p=Io(u)),d(u,p).join(`
`)}function s(u){return u.map(n).join(`
				UFO sighting`),c=P(),Ae&&Ae.c(),f=P(),L=H("div"),k=H("input"),T=P(),I=H("div"),O=P(),J=H("p"),X=W(G),j=W(`
				Airports`),R=P(),_e&&_e.c(),z=P(),q=H("div"),N=H("p"),F=W("  "),v=P(),D=H("p"),x=W(E),w=W(" State Color"),$=P(),V&&V.c(),ee=P(),Y=H("div"),U=H("input"),te=P(),le=H("div"),ie=P(),re=H("p"),ce=W("Cities"),this.h()},l(ae){t=M(ae,"DIV",{class:!0});var se=S(t);a=M(se,"DIV",{class:!0});var ye=S(a);i=M(ye,"CENTER",{});var Z=S(i);l=M(Z,"H4",{class:!0});var de=S(l);d=b(de,"Filter"),de.forEach(m),Z.forEach(m),r=B(ye),o=M(ye,"DIV",{class:!0});var Ie=S(o);s=M(Ie,"INPUT",{type:!0,class:!0}),n=B(Ie),g=M(Ie,"DIV",{class:!0}),S(g).forEach(m),u=B(Ie),p=M(Ie,"P",{class:!0});var Oe=S(p);h=b(Oe,A),C=b(Oe,`
				UFO sighting`),Oe.forEach(m),Ie.forEach(m),c=B(ye),Ae&&Ae.l(ye),f=B(ye),L=M(ye,"DIV",{class:!0});var Re=S(L);k=M(Re,"INPUT",{type:!0,class:!0}),T=B(Re),I=M(Re,"DIV",{class:!0}),S(I).forEach(m),O=B(Re),J=M(Re,"P",{class:!0});var xe=S(J);X=b(xe,G),j=b(xe,`
				Airports`),xe.forEach(m),Re.forEach(m),R=B(ye),_e&&_e.l(ye),z=B(ye),q=M(ye,"DIV",{class:!0});var be=S(q);N=M(be,"P",{});var Pe=S(N);F=b(Pe,"  "),Pe.forEach(m),v=B(be),D=M(be,"P",{class:!0});var De=S(D);x=b(De,E),w=b(De," State Color"),De.forEach(m),be.forEach(m),$=B(ye),V&&V.l(ye),ee=B(ye),Y=M(ye,"DIV",{class:!0});var Ue=S(Y);U=M(Ue,"INPUT",{type:!0,class:!0}),te=B(Ue),le=M(Ue,"DIV",{class:!0}),S(le).forEach(m),ie=B(Ue),re=M(Ue,"P",{class:!0});var Mt=S(re);ce=b(Mt,"Cities"),Mt.forEach(m),Ue.forEach(m),ye.forEach(m),se.forEach(m),this.h()},h(){y(l,"class","title"),y(s,"type","checkbox"),y(s,"class","svelte-12q5feh"),y(g,"class","ufo_legend svelte-12q5feh"),y(p,"class","desc svelte-12q5feh"),y(o,"class","item svelte-12q5feh"),y(k,"type","checkbox"),y(k,"class","svelte-12q5feh"),y(I,"class","airport_legend svelte-12q5feh"),y(J,"class","desc svelte-12q5feh"),y(L,"class","item svelte-12q5feh"),y(D,"class","desc svelte-12q5feh"),y(q,"class","item svelte-12q5feh"),y(U,"type","checkbox"),y(U,"class","svelte-12q5feh"),y(le,"class","city_legend svelte-12q5feh"),y(re,"class","desc svelte-12q5feh"),y(Y,"class","item svelte-12q5feh"),y(a,"class","legend svelte-12q5feh"),y(t,"class",oe="card "+e[0]+" svelte-12q5feh")},m(ae,se){K(ae,t,se),_(t,a),_(a,i),_(i,l),_(l,d),_(a,r),_(a,o),_(o,s),s.checked=e[7].display_options.ufo,_(o,n),_(o,g),_(o,u),_(o,p),_(p,h),_(p,C),_(a,c),Ae&&Ae.m(a,null),_(a,f),_(a,L),_(L,k),k.checked=e[7].display_options.airport,_(L,T),_(L,I),_(L,O),_(L,J),_(J,X),_(J,j),_(a,R),_e&&_e.m(a,null),_(a,z),_(a,q),_(q,N),_(N,F),_(q,v),_(q,D),_(D,x),_(D,w),_(a,$),V&&V.m(a,null),_(a,ee),_(a,Y),_(Y,U),U.checked=e[7].display_options.cities,_(Y,te),_(Y,le),_(Y,ie),_(Y,re),_(re,ce),pe||(Fe=[ge(s,"change",e[8]),ge(o,"click",e[9]),ge(k,"change",e[20]),ge(L,"click",e[21]),ge(q,"click",e[23]),ge(U,"change",e[32])],pe=!0)},p(ae,se){se[0]&128&&(s.checked=ae[7].display_options.ufo),se[0]&4&&A!==(A=ae[2]?"▼":"▶")&&Le(h,A),ae[2]?Ae?Ae.p(ae,se):(Ae=o9(ae),Ae.c(),Ae.m(a,f)):Ae&&(Ae.d(1),Ae=null),se[0]&128&&(k.checked=ae[7].display_options.airport),se[0]&2&&G!==(G=ae[1]?"▼":"▶")&&Le(X,G),ae[1]?_e?_e.p(ae,se):(_e=s9(ae),_e.c(),_e.m(a,z)):_e&&(_e.d(1),_e=null),se[0]&64&&E!==(E=ae[6]?"▼":"▶")&&Le(x,E),ae[6]?V?V.p(ae,se):(V=m9(ae),V.c(),V.m(a,ee)):V&&(V.d(1),V=null),se[0]&128&&(U.checked=ae[7].display_options.cities),se[0]&1&&oe!==(oe="card "+ae[0]+" svelte-12q5feh")&&y(t,"class",oe)},i:He,o:He,d(ae){ae&&m(t),Ae&&Ae.d(),_e&&_e.d(),V&&V.d(),pe=!1,Lt(Fe)}}}function H8(e,t,a){let i;Gd(e,ne,w=>a(7,i=w));let{class:l=""}=t,d=!1,r=!1,o=!1,s=!1,n=!1,g=!1;function u(){i.display_options.ufo=this.checked,ne.set(i)}const p=()=>a(2,r=!r),A=()=>a(3,o=!o);function h(){i.display_options.ufo_images=this.checked,ne.set(i)}function C(){i.display_options.ufo_no_images=this.checked,ne.set(i)}const c=()=>a(5,n=!n);function f(){i.display_options.ufo_hoax=this.checked,ne.set(i)}function L(){i.display_options.ufo_non_hoax=this.checked,ne.set(i)}const k=()=>a(4,s=!s),T=()=>Object.keys(i.shapes_options).forEach(w=>Ke(ne,i.shapes_options[w]=!1,i)),I=()=>Object.keys(i.shapes_options).forEach(w=>Ke(ne,i.shapes_options[w]=!0,i));function O(w){i.shapes_options[w]=this.checked,ne.set(i)}function J(){i.display_options.airport=this.checked,ne.set(i)}const G=()=>a(1,d=!d);function X(w){i.display_options[w]=this.checked,ne.set(i)}const j=()=>a(6,g=!g);function R(){i.display_options.religion=this.checked,ne.set(i)}const z=()=>{Ke(ne,i.display_options.population=!1,i),Ke(ne,i.display_options.drugs=!1,i),Ke(ne,i.display_options.marijuana=!1,i)};function q(){i.display_options.population=this.checked,ne.set(i)}const N=()=>{Ke(ne,i.display_options.drugs=!1,i),Ke(ne,i.display_options.religion=!1,i),Ke(ne,i.display_options.marijuana=!1,i)};function F(){i.display_options.drugs=this.checked,ne.set(i)}const v=()=>{Ke(ne,i.display_options.population=!1,i),Ke(ne,i.display_options.religion=!1,i),Ke(ne,i.display_options.marijuana=!1,i)};function D(){i.display_options.marijuana=this.checked,ne.set(i)}const E=()=>{Ke(ne,i.display_options.population=!1,i),Ke(ne,i.display_options.religion=!1,i),Ke(ne,i.display_options.drugs=!1,i)};function x(){i.display_options.cities=this.checked,ne.set(i)}return e.$$set=w=>{"class"in w&&a(0,l=w.class)},[l,d,r,o,s,n,g,i,u,p,A,h,C,c,f,L,k,T,I,O,J,G,X,j,R,z,q,N,F,v,D,E,x]}class M8 extends Ve{constructor(t){super(),Je(this,t,H8,c8,Ye,{class:0},null,[-1,-1])}}function y9(e){let t,a,i;return{c(){t=H("center"),a=H("p"),i=W("💡 Select a date range to filter the data")},l(l){t=M(l,"CENTER",{});var d=S(t);a=M(d,"P",{});var r=S(a);i=b(r,"💡 Select a date range to filter the data"),r.forEach(m),d.forEach(m)},m(l,d){K(l,t,d),_(t,a),_(a,i)},d(l){l&&m(t)}}}function C8(e){let t,a,i,l,d,r,o,s,n,g=e[1]==null&&e[2]==null&&y9();return{c(){t=H("div"),g&&g.c(),a=P(),i=H("div"),l=H("input"),d=P(),r=H("input"),this.h()},l(u){t=M(u,"DIV",{class:!0});var p=S(t);g&&g.l(p),a=B(p),i=M(p,"DIV",{class:!0});var A=S(i);l=M(A,"INPUT",{type:!0,class:!0}),d=B(A),r=M(A,"INPUT",{type:!0,class:!0}),A.forEach(m),p.forEach(m),this.h()},h(){y(l,"type","date"),y(l,"class","svelte-15f6zd5"),y(r,"type","date"),y(r,"class","svelte-15f6zd5"),y(i,"class","dates svelte-15f6zd5"),y(t,"class",o=e[0]+" time svelte-15f6zd5")},m(u,p){K(u,t,p),g&&g.m(t,null),_(t,a),_(t,i),_(i,l),ii(l,e[1]),_(i,d),_(i,r),ii(r,e[2]),s||(n=[ge(l,"input",e[4]),ge(l,"change",e[3]),ge(r,"input",e[5]),ge(r,"change",e[3])],s=!0)},p(u,[p]){u[1]==null&&u[2]==null?g||(g=y9(),g.c(),g.m(t,a)):g&&(g.d(1),g=null),p&2&&ii(l,u[1]),p&4&&ii(r,u[2]),p&1&&o!==(o=u[0]+" time svelte-15f6zd5")&&y(t,"class",o)},i:He,o:He,d(u){u&&m(t),g&&g.d(),s=!1,Lt(n)}}}function S8(e,t,a){let{class:i=""}=t,l="1721-02-02",d="2023-01-01";function r(){ne.update(n=>(n.start_date=new Date(l),n.end_date=new Date(d),n))}function o(){l=this.value,a(1,l)}function s(){d=this.value,a(2,d)}return e.$$set=n=>{"class"in n&&a(0,i=n.class)},[i,l,d,r,o,s]}class N8 extends Ve{constructor(t){super(),Je(this,t,S8,C8,Ye,{class:0})}}function f8(e){let t,a;return{c(){t=H("div"),this.h()},l(i){t=M(i,"DIV",{class:!0});var l=S(t);l.forEach(m),this.h()},h(){y(t,"class",a="footer "+e[0]+" svelte-iq9fkt")},m(i,l){K(i,t,l)},p(i,[l]){l&1&&a!==(a="footer "+i[0]+" svelte-iq9fkt")&&y(t,"class",a)},i:He,o:He,d(i){i&&m(t)}}}function F8(e,t,a){let{class:i=""}=t;return e.$$set=l=>{"class"in l&&a(0,i=l.class)},[i]}class L8 extends Ve{constructor(t){super(),Je(this,t,F8,f8,Ye,{class:0})}}function A9(e){let t,a,i,l,d,r,o,s,n;return{c(){t=H("div"),a=W("Min: 0.6 people/mi"),i=H("sub"),l=W("2"),d=P(),r=H("div"),o=W("Max: 833 people/mi"),s=H("sub"),n=W("2"),this.h()},l(g){t=M(g,"DIV",{style:!0,class:!0});var u=S(t);a=b(u,"Min: 0.6 people/mi"),i=M(u,"SUB",{});var p=S(i);l=b(p,"2"),p.forEach(m),u.forEach(m),d=B(g),r=M(g,"DIV",{style:!0,class:!0});var A=S(r);o=b(A,"Max: 833 people/mi"),s=M(A,"SUB",{});var h=S(s);n=b(h,"2"),h.forEach(m),A.forEach(m),this.h()},h(){Q(t,"background-color",e[2](0)),y(t,"class","svelte-1utqpr3"),Q(r,"background-color",e[2](1)),Q(r,"color","#adf0dd"),y(r,"class","svelte-1utqpr3")},m(g,u){K(g,t,u),_(t,a),_(t,i),_(i,l),K(g,d,u),K(g,r,u),_(r,o),_(r,s),_(s,n)},p:He,d(g){g&&m(t),g&&m(d),g&&m(r)}}}function h9(e){let t,a,i,l,d,r,o,s;return{c(){t=H("div"),a=W("Min: 9.03%"),i=P(),l=H("div"),d=W("16.98%"),r=P(),o=H("div"),s=W("Max: 24.93%"),this.h()},l(n){t=M(n,"DIV",{style:!0,class:!0});var g=S(t);a=b(g,"Min: 9.03%"),g.forEach(m),i=B(n),l=M(n,"DIV",{style:!0,class:!0});var u=S(l);d=b(u,"16.98%"),u.forEach(m),r=B(n),o=M(n,"DIV",{style:!0,class:!0});var p=S(o);s=b(p,"Max: 24.93%"),p.forEach(m),this.h()},h(){Q(t,"background-color",e[2](0)),y(t,"class","svelte-1utqpr3"),Q(l,"background-color",e[2](.5)),Q(l,"color","#ffffff"),y(l,"class","svelte-1utqpr3"),Q(o,"background-color",e[2](1)),Q(o,"color","#ffffff"),y(o,"class","svelte-1utqpr3")},m(n,g){K(n,t,g),_(t,a),K(n,i,g),K(n,l,g),_(l,d),K(n,r,g),K(n,o,g),_(o,s)},p:He,d(n){n&&m(t),n&&m(i),n&&m(l),n&&m(r),n&&m(o)}}}function c9(e){let t,a,i,l,d,r,o,s;return{c(){t=H("div"),a=W("Min: 32%"),i=P(),l=H("div"),d=W("54.5%"),r=P(),o=H("div"),s=W("Max: 77%"),this.h()},l(n){t=M(n,"DIV",{style:!0,class:!0});var g=S(t);a=b(g,"Min: 32%"),g.forEach(m),i=B(n),l=M(n,"DIV",{style:!0,class:!0});var u=S(l);d=b(u,"54.5%"),u.forEach(m),r=B(n),o=M(n,"DIV",{style:!0,class:!0});var p=S(o);s=b(p,"Max: 77%"),p.forEach(m),this.h()},h(){Q(t,"background-color",e[2](0)),y(t,"class","svelte-1utqpr3"),Q(l,"background-color",e[2](.5)),Q(l,"color","#ffffff"),y(l,"class","svelte-1utqpr3"),Q(o,"background-color",e[2](1)),Q(o,"color","#ffffff"),y(o,"class","svelte-1utqpr3")},m(n,g){K(n,t,g),_(t,a),K(n,i,g),K(n,l,g),_(l,d),K(n,r,g),K(n,o,g),_(o,s)},p:He,d(n){n&&m(t),n&&m(i),n&&m(l),n&&m(r),n&&m(o)}}}function H9(e){let t,a,i,l,d,r,o,s;return{c(){t=H("div"),a=W("Min: 7.77%"),i=P(),l=H("div"),d=W("15.52%"),r=P(),o=H("div"),s=W("Max: 23.27%"),this.h()},l(n){t=M(n,"DIV",{style:!0,class:!0});var g=S(t);a=b(g,"Min: 7.77%"),g.forEach(m),i=B(n),l=M(n,"DIV",{style:!0,class:!0});var u=S(l);d=b(u,"15.52%"),u.forEach(m),r=B(n),o=M(n,"DIV",{style:!0,class:!0});var p=S(o);s=b(p,"Max: 23.27%"),p.forEach(m),this.h()},h(){Q(t,"background-color",e[2](0)),y(t,"class","svelte-1utqpr3"),Q(l,"background-color",e[2](.5)),Q(l,"color","#ffffff"),y(l,"class","svelte-1utqpr3"),Q(o,"background-color",e[2](1)),Q(o,"color","#ffffff"),y(o,"class","svelte-1utqpr3")},m(n,g){K(n,t,g),_(t,a),K(n,i,g),K(n,l,g),_(l,d),K(n,r,g),K(n,o,g),_(o,s)},p:He,d(n){n&&m(t),n&&m(i),n&&m(l),n&&m(r),n&&m(o)}}}function T8(e){var g,u,p,A;let t,a,i,l,d,r=((g=e[1])==null?void 0:g.display_options.population)&&A9(e),o=((u=e[1])==null?void 0:u.display_options.religion)&&h9(e),s=((p=e[1])==null?void 0:p.display_options.drugs)&&c9(e),n=((A=e[1])==null?void 0:A.display_options.marijuana)&&H9(e);return{c(){t=H("div"),r&&r.c(),a=P(),o&&o.c(),i=P(),s&&s.c(),l=P(),n&&n.c(),this.h()},l(h){t=M(h,"DIV",{class:!0});var C=S(t);r&&r.l(C),a=B(C),o&&o.l(C),i=B(C),s&&s.l(C),l=B(C),n&&n.l(C),C.forEach(m),this.h()},h(){y(t,"class",d=e[0]+" legend card svelte-1utqpr3")},m(h,C){K(h,t,C),r&&r.m(t,null),_(t,a),o&&o.m(t,null),_(t,i),s&&s.m(t,null),_(t,l),n&&n.m(t,null)},p(h,[C]){var c,f,L,k;(c=h[1])!=null&&c.display_options.population?r?r.p(h,C):(r=A9(h),r.c(),r.m(t,a)):r&&(r.d(1),r=null),(f=h[1])!=null&&f.display_options.religion?o?o.p(h,C):(o=h9(h),o.c(),o.m(t,i)):o&&(o.d(1),o=null),(L=h[1])!=null&&L.display_options.drugs?s?s.p(h,C):(s=c9(h),s.c(),s.m(t,l)):s&&(s.d(1),s=null),(k=h[1])!=null&&k.display_options.marijuana?n?n.p(h,C):(n=H9(h),n.c(),n.m(t,null)):n&&(n.d(1),n=null),C&1&&d!==(d=h[0]+" legend card svelte-1utqpr3")&&y(t,"class",d)},i:He,o:He,d(h){h&&m(t),r&&r.d(),o&&o.d(),s&&s.d(),n&&n.d()}}}function R8(e,t,a){let{class:i=""}=t,l=ar().domain([0,1]).range(["#aaaaaa","#222222"]);Vt("#aaaaaa","#222222")(.5),Vt("#aaaaaa","#222222")(0),Vt("#aaaaaa","#222222")(.44);let d=null;return ne.subscribe(r=>{a(1,d=r)}),e.$$set=r=>{"class"in r&&a(0,i=r.class)},[i,d,l]}class k8 extends Ve{constructor(t){super(),Je(this,t,R8,T8,Ye,{class:0})}}function I8(e){let t,a,i,l,d,r,o,s,n,g,u,p,A,h,C,c,f,L,k,T,I,O,J,G,X,j,R,z,q,N,F;return{c(){t=H("div"),a=H("style"),i=W(`circle {
			fill: var(--accent);
			opacity: 0.8;
		}

		line {
			stroke-width: 1px;
			opacity: 0.6;
		}

		text {
			font-size: 0.8em;
		}`),l=P(),d=H("h4"),r=W("Relationship with Other Attributes on State Level"),o=P(),s=H("div"),n=H("p"),g=W("Hover over a dot in the scatterplot to see which state it corresponds to!"),u=P(),p=H("p"),A=W("Aggregated UFO sightings from year "),h=H("input"),C=W(`
			to
			`),c=H("input"),f=P(),L=H("p"),k=W(`First Attribute (X axis):
			`),T=H("span"),I=H("select"),O=P(),J=H("p"),G=W(`Second Attribute (Y axis):
			`),X=H("span"),j=H("select"),R=P(),z=Me("svg"),q=P(),N=H("script"),F=W(`function sleep(time) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, time);
			});
		}

		sleep(3000).then(() => {
			// how long transitions last (msec)
			let transitionTime = 2000;
			let state_indices = [
				'AK',
				'AL',
				'AR',
				'AZ',
				'CA',
				'CO',
				'CT',
				'DC',
				'DE',
				'FL',
				'GA',
				'HI',
				'IA',
				'ID',
				'IL',
				'IN',
				'KS',
				'KY',
				'LA',
				'MA',
				'MD',
				'ME',
				'MI',
				'MN',
				'MO',
				'MS',
				'MT',
				'NC',
				'ND',
				'NE',
				'NH',
				'NJ',
				'NM',
				'NV',
				'NY',
				'OH',
				'OK',
				'OR',
				'PA',
				'RI',
				'SC',
				'SD',
				'TN',
				'TX',
				'UT',
				'VA',
				'VT',
				'WA',
				'WI',
				'WV',
				'WY'
			];

			let longStates = {
				AL: 'Alabama',
				AK: 'Alaska',
				AZ: 'Arizona',
				AR: 'Arkansas',
				CA: 'California',
				CO: 'Colorado',
				CT: 'Connecticut',
				DE: 'Delaware',
				DC: 'District of Columbia',
				FL: 'Florida',
				GA: 'Georgia',
				HI: 'Hawaii',
				ID: 'Idaho',
				IL: 'Illinois',
				IN: 'Indiana',
				IA: 'Iowa',
				KS: 'Kansas',
				KY: 'Kentucky',
				LA: 'Louisiana',
				ME: 'Maine',
				MD: 'Maryland',
				MA: 'Massachusetts',
				MI: 'Michigan',
				MN: 'Minnesota',
				MS: 'Mississippi',
				MO: 'Missouri',
				MT: 'Montana',
				NE: 'Nevada',
				NV: 'Nebraska',
				NH: 'New Hampshire',
				NJ: 'New Jersey',
				NM: 'New Mexico',
				NY: 'New York',
				NC: 'North Carolina',
				ND: 'North Dakota',
				OH: 'Ohio',
				OK: 'Oklahoma',
				OR: 'Oregon',
				PA: 'Pennsylvania',
				RI: 'Rhode Island',
				SC: 'South Carolina',
				SD: 'South Dakota',
				TN: 'Tennessee',
				TX: 'Texas',
				UT: 'Utah',
				VT: 'Vermont',
				VA: 'Virginia',
				WA: 'Washington',
				WV: 'West Virginia',
				WI: 'Wisconsin',
				WY: 'Wyoming'
			};

			let longVars = {
				Num_Sightings: 'Number of UFO sightings',
				Rel_Num_Sightings: 'Number of UFO sightings per resident',
				Rel_Very_important: 'Religion: very important (proportion of people)',
				Rel_Somewhat_important: 'Religion: somewhat important (proportion of people)',
				Rel_Not_too_important: 'Religion: not too important (proportion of people)',
				Rel_Not_at_all_important: 'Religion: not at all important (proportion of people)',
				Rel_Dont_know: "Religion: don't know how important (proportion of people)",
				Population_Density: 'Population density (population per square mile)',
				Total_Resident_Population: 'Population',
				Illicit_Drug_Use: 'Illicit Drug Use (proportion of people)',
				Marijuana_Use: 'Marijuana Use (proportion of people)',
				Illicit_Drug_Use_Other_Than_Marijuana:
					'Illicit Drug Use Other Than Marijuana (proportion of people)',
				Binge_Alcohol_Use: 'Binge Alcohol Use (proportion of people)',
				Illicit_Drug_Use_Disorder: 'Illicit Drug Use Disorder (proportion of people)',
				Serious_Mental_Illness: 'Serious Mental Illness (proportion of people)',
				Any_Mental_Illness: 'Any Mental Illness (proportion of people)'
			};

			// use Margin Convention to layout the SVG with an inner plotting region
			// and an outer region for axes, labels, etc.
			let outerWidth = 600;
			let outerHeight = 400;
			let margins = { top: 10, bottom: 60, left: 60, right: 30 };
			let innerWidth = outerWidth - margins.left - margins.right;
			let innerHeight = outerHeight - margins.top - margins.bottom;

			let scatterOuter = d3
				.select('svg#scatter-container')
				.attr('width', outerWidth)
				.attr('height', outerHeight);

			let scatterInner = scatterOuter
				.append('g')
				.attr('id', 'inner-region')
				.attr('width', innerWidth)
				.attr('height', innerHeight)
				.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

			// load data
			let url_other =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/scatterplot_data_full_relative_drugsincl.csv';
			let url_sight =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/relative_num_sightings_per_state_per_year_timespan_rows_full.csv';
			let url_sight_abs =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/num_sightings_per_state_per_year_timespan_rows_full.csv';
			d3.csv(url_other, cleanup_data, function (error, d_other) {
				if (error) {
					console.log(error);
					return;
				}
				d3.csv(url_sight, cleanup_data, function (error, d_sight) {
					if (error) {
						console.log(error);
						return;
					}
					d3.csv(url_sight_abs, cleanup_data, function (error, d_sight_abs) {
						if (error) {
							console.log(error);
							return;
						}
						setup(d_other, d_sight, d_sight_abs);
						update(d_other, d_sight, d_sight_abs);
					});
				});
			});

			//convert all strings that represent numbers to numbers.
			function cleanup_data(d) {
				for (k of Object.keys(d)) {
					if (k != 'State') d[k] = +d[k];
				}
				return d;
			}

			// declare some variables that will be assigned in functions below
			let d_other_global = [];
			let d_sight_global = [];
			let d_sight_abs_global = [];
			let xScale, yScale;
			let xAxis, yAxis;
			let min_year = 1910,
				max_year = 2023;

			function get_state_year_idx(state, start_year, end_year) {
				state_idx = state_indices.indexOf(state);
				start_year_idx = start_year - min_year;
				end_year_idx = end_year - min_year;
				return (
					state_idx * 6555 +
					(114.5 - start_year_idx / 2.0) * start_year_idx +
					end_year_idx -
					start_year_idx
				);
			}

			const f = (formatValue = d3.format('.3s'));

			function axis_label_format(d) {
				if (d == 0) {
					return 0;
				}
				if (d >= 1000000) {
					return d / 1000000 + ' M.';
				}
				if (d <= 0.001) {
					return f(d);
				}
				return d;
			}

			// setup() is for setting up plot elements once at the beginning
			// update() will be used for the initial draw and for redrawing upon change
			function setup(d_other, d_sight, d_sight_abs) {
				d_other_global = d_other;
				d_sight_global = d_sight;
				d_sight_abs_global = d_sight_abs;

				//State is not quantitative, so it shouldn't be selected
				let variables = Object.keys(d_other[0]).filter(
					(d) =>
						d != 'State' &&
						(d != 'Rel_Sample_size') & (d != 'Num_Sightings') & (d != 'Rel_Num_Sightings')
				);
				let x_variables = ['Num_Sightings', 'Rel_Num_Sightings'];

				// border around plotting region

				// populate selectors
				d3.select('select.xvar')
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global))
					.selectAll('option')
					.data(x_variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('select.yvar')
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global))
					.selectAll('option')
					.data(variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('#button_start_year').on('change', () => {
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				d3.select('#button_end_year').on('change', () => {
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				// initialize values of select elements.
				d3.select('select.xvar').property('value', 'Rel_Num_Sightings');
				d3.select('select.yvar').property('value', 'Population_Density');
				d3.select('#button_start_year').property('value', min_year);
				d3.select('#button_end_year').property('value', max_year);

				d3.select('#button_start_year').property('min', min_year);
				d3.select('#button_start_year').property(
					'max',
					d3.select('#button_end_year').property('value')
				);
				d3.select('#button_end_year').property(
					'min',
					d3.select('#button_start_year').property('value')
				);
				d3.select('#button_end_year').property('max', max_year);

				// read current selections
				let xvar = d3.select('select.xvar').property('value');
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					if (xvar == 'Num_Sightings') {
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar];
					return;
				});

				// create scales based on selections
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale = d3.scaleLinear().domain([0, x_domain_max]).range([0, innerWidth]);
				xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(axis_label_format);

				yScale = d3
					.scaleLinear()
					.domain([0, d3.max(d_other.map((d) => d[yvar]))])
					.range([0, innerHeight].reverse());
				yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(axis_label_format);

				// create axes
				scatterInner
					.append('g')
					.attr('transform', 'translate(' + 0 + ', ' + innerHeight + ')')
					.attr('class', 'x axis')
					.call(xAxis);

				scatterInner.append('g').attr('class', 'y axis').call(yAxis);

				scatterOuter
					.append('text')
					.attr('class', 'x axis')
					.attr('x', margins.left + innerWidth / 2)
					.attr('y', outerHeight - margins.bottom / 2)
					.attr('text-anchor', 'middle')
					.text(longVars[xvar]);

				scatterOuter
					.append('text')
					.attr('class', 'y axis')
					.attr('x', margins.left / 2)
					.attr('y', margins.top + innerHeight / 2)
					.attr('text-anchor', 'middle')
					.attr('transform', \`rotate(-90 \${margins.left / 2} \${margins.top + innerHeight / 2})\`)
					.text(longVars[yvar]);
			}

			// update elements that get modified when selections change
			function update(d_other, d_sight, d_sight_abs) {
				let xvar = d3.select('select.xvar').property('value');
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				if (start_year < min_year) {
					d3.select('#button_start_year').property('value', min_year);
				}
				if (end_year > max_year) {
					d3.select('#button_end_year').property('value', max_year);
				}
				if (start_year > end_year && end_year >= min_year) {
					d3.select('#button_start_year').property('value', end_year);
				}
				if (start_year > end_year && end_year < min_year) {
					d3.select('#button_start_year').property('value', min_year);
					d3.select('#button_end_year').property('value', min_year);
				}
				start_year = +d3.select('#button_start_year').property('value');
				end_year = +d3.select('#button_end_year').property('value');

				d3.select('#button_start_year').property('min', min_year);
				d3.select('#button_start_year').property(
					'max',
					d3.select('#button_end_year').property('value')
				);
				d3.select('#button_end_year').property(
					'min',
					d3.select('#button_start_year').property('value')
				);
				d3.select('#button_end_year').property('max', max_year);

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					if (xvar == 'Num_Sightings') {
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar];
					return;
				});

				// update scales
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale.domain([0, x_domain_max]);
				yScale.domain([0, d3.max(d_other.map((d) => d[yvar]))]);

				// update axes
				scatterInner.select('.x.axis').transition().duration(transitionTime).call(xAxis);
				scatterInner.select('.y.axis').transition().duration(transitionTime).call(yAxis);

				// main plot
				scatterInner
					.selectAll('circle')
					.data(d_other)
					.enter()
					.append('circle')
					.attr('cx', function (d) {
						return xScale(d['Rel_Num_Sightings']);
					})
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					})
					.attr('r', 4)
					.append('title') // display state name when hovering over point
					.text(function (d) {
						return longStates[d['State']];
					});

				scatterInner.selectAll('circle').data(d_other).exit().remove();

				scatterInner
					.selectAll('circle')
					.data(d_other)
					.transition()
					.duration(transitionTime)
					.attr('cx', function (d) {
						return xScale(d['Rel_Num_Sightings']);
					})
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					});

				// axis labels
				scatterOuter
					.selectAll('text.x.axis') // select text elements with two both classes
					.transition()
					.duration(transitionTime)
					.text(longVars[xvar]);

				scatterOuter
					.selectAll('text.y.axis') // select text elements with two both classes
					.transition()
					.duration(transitionTime)
					.text(longVars[yvar]);
			}
		});`),this.h()},l(v){t=M(v,"DIV",{class:!0});var D=S(t);a=M(D,"STYLE",{});var E=S(a);i=b(E,`circle {
			fill: var(--accent);
			opacity: 0.8;
		}

		line {
			stroke-width: 1px;
			opacity: 0.6;
		}

		text {
			font-size: 0.8em;
		}`),E.forEach(m),l=B(D),d=M(D,"H4",{class:!0});var x=S(d);r=b(x,"Relationship with Other Attributes on State Level"),x.forEach(m),o=B(D),s=M(D,"DIV",{id:!0});var w=S(s);n=M(w,"P",{class:!0});var $=S(n);g=b($,"Hover over a dot in the scatterplot to see which state it corresponds to!"),$.forEach(m),u=B(w),p=M(w,"P",{class:!0});var ee=S(p);A=b(ee,"Aggregated UFO sightings from year "),h=M(ee,"INPUT",{type:!0,id:!0,class:!0}),C=b(ee,`
			to
			`),c=M(ee,"INPUT",{type:!0,id:!0,class:!0}),ee.forEach(m),f=B(w),L=M(w,"P",{class:!0});var Y=S(L);k=b(Y,`First Attribute (X axis):
			`),T=M(Y,"SPAN",{class:!0});var U=S(T);I=M(U,"SELECT",{class:!0,name:!0}),S(I).forEach(m),U.forEach(m),Y.forEach(m),O=B(w),J=M(w,"P",{class:!0});var te=S(J);G=b(te,`Second Attribute (Y axis):
			`),X=M(te,"SPAN",{class:!0});var le=S(X);j=M(le,"SELECT",{class:!0,name:!0}),S(j).forEach(m),le.forEach(m),te.forEach(m),w.forEach(m),R=B(D),z=Ce(D,"svg",{id:!0,class:!0}),S(z).forEach(m),q=B(D),N=M(D,"SCRIPT",{});var ie=S(N);F=b(ie,`function sleep(time) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, time);
			});
		}

		sleep(3000).then(() => {
			// how long transitions last (msec)
			let transitionTime = 2000;
			let state_indices = [
				'AK',
				'AL',
				'AR',
				'AZ',
				'CA',
				'CO',
				'CT',
				'DC',
				'DE',
				'FL',
				'GA',
				'HI',
				'IA',
				'ID',
				'IL',
				'IN',
				'KS',
				'KY',
				'LA',
				'MA',
				'MD',
				'ME',
				'MI',
				'MN',
				'MO',
				'MS',
				'MT',
				'NC',
				'ND',
				'NE',
				'NH',
				'NJ',
				'NM',
				'NV',
				'NY',
				'OH',
				'OK',
				'OR',
				'PA',
				'RI',
				'SC',
				'SD',
				'TN',
				'TX',
				'UT',
				'VA',
				'VT',
				'WA',
				'WI',
				'WV',
				'WY'
			];

			let longStates = {
				AL: 'Alabama',
				AK: 'Alaska',
				AZ: 'Arizona',
				AR: 'Arkansas',
				CA: 'California',
				CO: 'Colorado',
				CT: 'Connecticut',
				DE: 'Delaware',
				DC: 'District of Columbia',
				FL: 'Florida',
				GA: 'Georgia',
				HI: 'Hawaii',
				ID: 'Idaho',
				IL: 'Illinois',
				IN: 'Indiana',
				IA: 'Iowa',
				KS: 'Kansas',
				KY: 'Kentucky',
				LA: 'Louisiana',
				ME: 'Maine',
				MD: 'Maryland',
				MA: 'Massachusetts',
				MI: 'Michigan',
				MN: 'Minnesota',
				MS: 'Mississippi',
				MO: 'Missouri',
				MT: 'Montana',
				NE: 'Nevada',
				NV: 'Nebraska',
				NH: 'New Hampshire',
				NJ: 'New Jersey',
				NM: 'New Mexico',
				NY: 'New York',
				NC: 'North Carolina',
				ND: 'North Dakota',
				OH: 'Ohio',
				OK: 'Oklahoma',
				OR: 'Oregon',
				PA: 'Pennsylvania',
				RI: 'Rhode Island',
				SC: 'South Carolina',
				SD: 'South Dakota',
				TN: 'Tennessee',
				TX: 'Texas',
				UT: 'Utah',
				VT: 'Vermont',
				VA: 'Virginia',
				WA: 'Washington',
				WV: 'West Virginia',
				WI: 'Wisconsin',
				WY: 'Wyoming'
			};

			let longVars = {
				Num_Sightings: 'Number of UFO sightings',
				Rel_Num_Sightings: 'Number of UFO sightings per resident',
				Rel_Very_important: 'Religion: very important (proportion of people)',
				Rel_Somewhat_important: 'Religion: somewhat important (proportion of people)',
				Rel_Not_too_important: 'Religion: not too important (proportion of people)',
				Rel_Not_at_all_important: 'Religion: not at all important (proportion of people)',
				Rel_Dont_know: "Religion: don't know how important (proportion of people)",
				Population_Density: 'Population density (population per square mile)',
				Total_Resident_Population: 'Population',
				Illicit_Drug_Use: 'Illicit Drug Use (proportion of people)',
				Marijuana_Use: 'Marijuana Use (proportion of people)',
				Illicit_Drug_Use_Other_Than_Marijuana:
					'Illicit Drug Use Other Than Marijuana (proportion of people)',
				Binge_Alcohol_Use: 'Binge Alcohol Use (proportion of people)',
				Illicit_Drug_Use_Disorder: 'Illicit Drug Use Disorder (proportion of people)',
				Serious_Mental_Illness: 'Serious Mental Illness (proportion of people)',
				Any_Mental_Illness: 'Any Mental Illness (proportion of people)'
			};

			// use Margin Convention to layout the SVG with an inner plotting region
			// and an outer region for axes, labels, etc.
			let outerWidth = 600;
			let outerHeight = 400;
			let margins = { top: 10, bottom: 60, left: 60, right: 30 };
			let innerWidth = outerWidth - margins.left - margins.right;
			let innerHeight = outerHeight - margins.top - margins.bottom;

			let scatterOuter = d3
				.select('svg#scatter-container')
				.attr('width', outerWidth)
				.attr('height', outerHeight);

			let scatterInner = scatterOuter
				.append('g')
				.attr('id', 'inner-region')
				.attr('width', innerWidth)
				.attr('height', innerHeight)
				.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');

			// load data
			let url_other =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/scatterplot_data_full_relative_drugsincl.csv';
			let url_sight =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/relative_num_sightings_per_state_per_year_timespan_rows_full.csv';
			let url_sight_abs =
				'https://raw.githubusercontent.com/vfrawa/vfrawa.github.io/main/num_sightings_per_state_per_year_timespan_rows_full.csv';
			d3.csv(url_other, cleanup_data, function (error, d_other) {
				if (error) {
					console.log(error);
					return;
				}
				d3.csv(url_sight, cleanup_data, function (error, d_sight) {
					if (error) {
						console.log(error);
						return;
					}
					d3.csv(url_sight_abs, cleanup_data, function (error, d_sight_abs) {
						if (error) {
							console.log(error);
							return;
						}
						setup(d_other, d_sight, d_sight_abs);
						update(d_other, d_sight, d_sight_abs);
					});
				});
			});

			//convert all strings that represent numbers to numbers.
			function cleanup_data(d) {
				for (k of Object.keys(d)) {
					if (k != 'State') d[k] = +d[k];
				}
				return d;
			}

			// declare some variables that will be assigned in functions below
			let d_other_global = [];
			let d_sight_global = [];
			let d_sight_abs_global = [];
			let xScale, yScale;
			let xAxis, yAxis;
			let min_year = 1910,
				max_year = 2023;

			function get_state_year_idx(state, start_year, end_year) {
				state_idx = state_indices.indexOf(state);
				start_year_idx = start_year - min_year;
				end_year_idx = end_year - min_year;
				return (
					state_idx * 6555 +
					(114.5 - start_year_idx / 2.0) * start_year_idx +
					end_year_idx -
					start_year_idx
				);
			}

			const f = (formatValue = d3.format('.3s'));

			function axis_label_format(d) {
				if (d == 0) {
					return 0;
				}
				if (d >= 1000000) {
					return d / 1000000 + ' M.';
				}
				if (d <= 0.001) {
					return f(d);
				}
				return d;
			}

			// setup() is for setting up plot elements once at the beginning
			// update() will be used for the initial draw and for redrawing upon change
			function setup(d_other, d_sight, d_sight_abs) {
				d_other_global = d_other;
				d_sight_global = d_sight;
				d_sight_abs_global = d_sight_abs;

				//State is not quantitative, so it shouldn't be selected
				let variables = Object.keys(d_other[0]).filter(
					(d) =>
						d != 'State' &&
						(d != 'Rel_Sample_size') & (d != 'Num_Sightings') & (d != 'Rel_Num_Sightings')
				);
				let x_variables = ['Num_Sightings', 'Rel_Num_Sightings'];

				// border around plotting region

				// populate selectors
				d3.select('select.xvar')
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global))
					.selectAll('option')
					.data(x_variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('select.yvar')
					.on('change', () => update(d_other_global, d_sight_global, d_sight_abs_global))
					.selectAll('option')
					.data(variables)
					.enter()
					.append('option')
					.attr('value', (d) => d)
					.text((d) => longVars[d]);

				d3.select('#button_start_year').on('change', () => {
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				d3.select('#button_end_year').on('change', () => {
					update(d_other_global, d_sight_global, d_sight_abs_global);
				});

				// initialize values of select elements.
				d3.select('select.xvar').property('value', 'Rel_Num_Sightings');
				d3.select('select.yvar').property('value', 'Population_Density');
				d3.select('#button_start_year').property('value', min_year);
				d3.select('#button_end_year').property('value', max_year);

				d3.select('#button_start_year').property('min', min_year);
				d3.select('#button_start_year').property(
					'max',
					d3.select('#button_end_year').property('value')
				);
				d3.select('#button_end_year').property(
					'min',
					d3.select('#button_start_year').property('value')
				);
				d3.select('#button_end_year').property('max', max_year);

				// read current selections
				let xvar = d3.select('select.xvar').property('value');
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					if (xvar == 'Num_Sightings') {
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar];
					return;
				});

				// create scales based on selections
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale = d3.scaleLinear().domain([0, x_domain_max]).range([0, innerWidth]);
				xAxis = d3.axisBottom(xScale).tickSize(-innerHeight).tickFormat(axis_label_format);

				yScale = d3
					.scaleLinear()
					.domain([0, d3.max(d_other.map((d) => d[yvar]))])
					.range([0, innerHeight].reverse());
				yAxis = d3.axisLeft(yScale).tickSize(-innerWidth).tickFormat(axis_label_format);

				// create axes
				scatterInner
					.append('g')
					.attr('transform', 'translate(' + 0 + ', ' + innerHeight + ')')
					.attr('class', 'x axis')
					.call(xAxis);

				scatterInner.append('g').attr('class', 'y axis').call(yAxis);

				scatterOuter
					.append('text')
					.attr('class', 'x axis')
					.attr('x', margins.left + innerWidth / 2)
					.attr('y', outerHeight - margins.bottom / 2)
					.attr('text-anchor', 'middle')
					.text(longVars[xvar]);

				scatterOuter
					.append('text')
					.attr('class', 'y axis')
					.attr('x', margins.left / 2)
					.attr('y', margins.top + innerHeight / 2)
					.attr('text-anchor', 'middle')
					.attr('transform', \`rotate(-90 \${margins.left / 2} \${margins.top + innerHeight / 2})\`)
					.text(longVars[yvar]);
			}

			// update elements that get modified when selections change
			function update(d_other, d_sight, d_sight_abs) {
				let xvar = d3.select('select.xvar').property('value');
				let yvar = d3.select('select.yvar').property('value');
				let start_year = +d3.select('#button_start_year').property('value');
				let end_year = +d3.select('#button_end_year').property('value');

				if (start_year < min_year) {
					d3.select('#button_start_year').property('value', min_year);
				}
				if (end_year > max_year) {
					d3.select('#button_end_year').property('value', max_year);
				}
				if (start_year > end_year && end_year >= min_year) {
					d3.select('#button_start_year').property('value', end_year);
				}
				if (start_year > end_year && end_year < min_year) {
					d3.select('#button_start_year').property('value', min_year);
					d3.select('#button_end_year').property('value', min_year);
				}
				start_year = +d3.select('#button_start_year').property('value');
				end_year = +d3.select('#button_end_year').property('value');

				d3.select('#button_start_year').property('min', min_year);
				d3.select('#button_start_year').property(
					'max',
					d3.select('#button_end_year').property('value')
				);
				d3.select('#button_end_year').property(
					'min',
					d3.select('#button_start_year').property('value')
				);
				d3.select('#button_end_year').property('max', max_year);

				//change Num_sightings in d_other s.t. they reflect the chosen year range
				d_other.map((d) => {
					if (xvar == 'Num_Sightings') {
						d_sight_curr = [d_sight_abs[get_state_year_idx(d['State'], start_year, end_year)]];
					} else {
						d_sight_curr = [d_sight[get_state_year_idx(d['State'], start_year, end_year)]];
					}
					d['Rel_Num_Sightings'] = d_sight_curr[0][xvar];
					return;
				});

				// update scales
				// the domain will be modified when selections change
				if (xvar == 'Num_Sightings') {
					x_domain_max = d3.max([1, d3.max(d_other.map((d) => d['Rel_Num_Sightings']))]);
				} else {
					x_domain_max = d3.max(d_other.map((d) => d['Rel_Num_Sightings']));
				}

				xScale.domain([0, x_domain_max]);
				yScale.domain([0, d3.max(d_other.map((d) => d[yvar]))]);

				// update axes
				scatterInner.select('.x.axis').transition().duration(transitionTime).call(xAxis);
				scatterInner.select('.y.axis').transition().duration(transitionTime).call(yAxis);

				// main plot
				scatterInner
					.selectAll('circle')
					.data(d_other)
					.enter()
					.append('circle')
					.attr('cx', function (d) {
						return xScale(d['Rel_Num_Sightings']);
					})
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					})
					.attr('r', 4)
					.append('title') // display state name when hovering over point
					.text(function (d) {
						return longStates[d['State']];
					});

				scatterInner.selectAll('circle').data(d_other).exit().remove();

				scatterInner
					.selectAll('circle')
					.data(d_other)
					.transition()
					.duration(transitionTime)
					.attr('cx', function (d) {
						return xScale(d['Rel_Num_Sightings']);
					})
					.attr('cy', function (d) {
						return yScale(d[yvar]);
					});

				// axis labels
				scatterOuter
					.selectAll('text.x.axis') // select text elements with two both classes
					.transition()
					.duration(transitionTime)
					.text(longVars[xvar]);

				scatterOuter
					.selectAll('text.y.axis') // select text elements with two both classes
					.transition()
					.duration(transitionTime)
					.text(longVars[yvar]);
			}
		});`),ie.forEach(m),D.forEach(m),this.h()},h(){y(d,"class","title"),y(n,"class","svelte-w7lv0o"),y(h,"type","number"),y(h,"id","button_start_year"),y(h,"class","svelte-w7lv0o"),y(c,"type","number"),y(c,"id","button_end_year"),y(c,"class","svelte-w7lv0o"),y(p,"class","svelte-w7lv0o"),y(I,"class","xvar svelte-w7lv0o"),y(I,"name","xvar"),y(T,"class","xvar"),y(L,"class","svelte-w7lv0o"),y(j,"class","yvar svelte-w7lv0o"),y(j,"name","yvar"),y(X,"class","yvar"),y(J,"class","svelte-w7lv0o"),y(s,"id","controls"),y(z,"id","scatter-container"),y(z,"class","svelte-w7lv0o"),y(t,"class","scatterplot svelte-w7lv0o")},m(v,D){K(v,t,D),_(t,a),_(a,i),_(t,l),_(t,d),_(d,r),_(t,o),_(t,s),_(s,n),_(n,g),_(s,u),_(s,p),_(p,A),_(p,h),_(p,C),_(p,c),_(s,f),_(s,L),_(L,k),_(L,T),_(T,I),_(s,O),_(s,J),_(J,G),_(J,X),_(X,j),_(t,R),_(t,z),_(t,q),_(t,N),_(N,F)},p:He,i:He,o:He,d(v){v&&m(t)}}}class v8 extends Ve{constructor(t){super(),Je(this,t,null,I8,Ye,{})}}function O8(e){let t,a,i,l,d,r,o,s,n,g,u,p,A,h,C,c,f,L,k,T,I,O,J,G,X,j,R,z,q,N,F,v,D,E,x,w,$,ee,Y,U,te,le,ie,re,ce,oe,pe,Fe,Ae,_e,V,ae,se,ye,Z,de,Ie,Oe,Re,xe,be,Pe,De,Ue,Mt,kt,qt,It,ze,pt,lr,Ji,$t,Yi,xi,_t,Ui,zi,Zi,qi,$i,ji,st,jt,dr,Qi,Qt,el,tl,Tt,al,il,ll,dl,fe,ea,rl,ol,ta,nl,gl,aa,pl,_l,ia,sl,ul,la,ml,yl,da,Al,hl,ra,cl,Hl,oa,Ml,Cl,na,Sl,Nl,ke,vt,fl,ga,Fl,Ll,Ot,Tl,pa,Rl,kl,Pt,Il,_a,vl,Ol,Bt,Pl,sa,Bl,Wl,Wt,bl,ua,wl,Dl,bt,Kl,ma,Xl,El,wt,Gl,ya,Vl,Jl,Dt,Yl,Aa,xl,Ul,Kt,zl,ha,Zl;return{c(){t=H("div"),a=H("h1"),i=W("About"),l=P(),d=H("div"),r=H("h2"),o=W("Project Description"),s=P(),n=H("p"),g=W(`Have you ever wondered about extraterrestial activity on earth? Or do you think it's all made
			up and imagined? Or are you still torn between the two? Either way, the Useless Fisualization
			Operation was made for you! Our objective was to allow exploring reports of UFO sightings in
			the USA and uncover underlying patterns.`),u=P(),p=H("p"),A=W(`With the help of our interactive map you can investigate the locations of UFO sightings,
			filter them, and get detailed reports on demand as well as images if available. By including
			other data such as airport locations, you can decide for yourself if you think the two might
			be correlated. Relationships with further datasets can be explored via a scatterplot, where
			you can filter by years, in case you want to match the time frames of the two datasets.`),h=P(),C=H("p"),c=W(`To further incorporate the temporal dimension of the data, we have a heatmap showing the
			frequency of UFO sightings per date. Come see for yourself, we hope your time here is out of
			this world.`),f=P(),L=H("p"),k=W(`Please note that we make no claims on the validity of the reports or the relationships with
			other data, we merely wanted to create a framework for easy and fun exploration.`),T=P(),I=H("div"),O=H("video"),J=H("source"),X=P(),j=H("div"),R=H("h2"),z=W("Team"),q=P(),N=H("div"),F=H("div"),v=H("img"),E=P(),x=H("p"),w=W("Albin Kempe"),$=P(),ee=H("p"),Y=W("Front-End Developer "),U=H("br"),te=W(" UX/UI Designer"),le=P(),ie=H("div"),re=H("img"),oe=P(),pe=H("p"),Fe=W("Annika Oehri"),Ae=P(),_e=H("p"),V=W("Data Engineer "),ae=H("br"),se=W(" Front-End Developer"),ye=P(),Z=H("div"),de=H("img"),Oe=P(),Re=H("p"),xe=W("Frawa Vetterli"),be=P(),Pe=H("p"),De=W("Data Engineer "),Ue=H("br"),Mt=W("Front-End Developer "),kt=H("br"),qt=W(" UX/UI Designer"),It=P(),ze=H("div"),pt=H("img"),Ji=P(),$t=H("p"),Yi=W("Jonathan Cilli"),xi=P(),_t=H("p"),Ui=W("Data Engineer "),zi=H("br"),Zi=W(" Front-End Developer "),qi=H("br"),$i=W(" UX/UI Designer"),ji=P(),st=H("div"),jt=H("img"),Qi=P(),Qt=H("p"),el=W("Pedro Burgos"),tl=P(),Tt=H("p"),al=W("Front-End Developer "),il=H("br"),ll=W(" UX/UI Designer"),dl=P(),fe=H("div"),ea=H("h2"),rl=W("Data"),ol=P(),ta=H("p"),nl=W(`The main data on UFO sightings was scraped from the NATIONAL UFO Reporting Center Online
			Database NUFORC [1] on 3th February 2023. We took all fields except for the image links and
			the date of the sighting from the summary, whereas we accessed the report itself to get the
			image and the complete date. We geolocated our datapoints and discarded all sightings whose
			location we could not pinpoint. For the scatter plot and the heatmap, all dates not following
			the month/day/year convention were discarded.`),gl=P(),aa=H("p"),pl=W(`A paper by Plaza del Olmo [2] states that their is a sublineal relationship between UFO
			sightings and population density. Based on that, we decided to incorporate absolute population
			and population density data from the United Sates Census Bureau [3] into our visualization.
			The data includes a time dimension with steps of decades, going from 1910 to 2020. It was
			preprocessed by deleting all "regions" datapoints (e.g. midwest) and only keeping columns
			"state", "resident population" and "population density" where the latter is given as number of
			residents per square mile. For the scatterplot, the average between all decades was taken. For
			calculating the number of UFO sightings per person, state and year, we used the interpolated
			values for years originally not in the dataset.`),_l=P(),ia=H("p"),sl=W(`Furthermore, a paper by Irwin [4] describes that their might be some relationship between UFO
			sightings and religiosity, although not a proportional one. Therefore, we chose to include a
			dataset on religiosity from 2014 [5] which contains the percentage of people that find
			religion very important, somewhat important, not too important, not at all important and don't
			know how important. Preprocessing was done by changing < 1% to 0 and changing percentages
			to proportions in general (eg. 77% to 0.77).`),ul=P(),la=H("p"),ml=W(`During discussions with other students, they said that they would also be interested in a
			visualization of the relationship between UFO sightings and drug use which is why different
			drug use metrics are also included from the Substance Abuse and Mental Health Services
			Administration's National Survey on Drug Use and Health (NSDUH) from 2021 [6]. The metrics
			include Illicit Drug Use in the Past Month, Marijuana Use in the Past Month, Illicit Drug Use
			Other Than Marijuana in the Past Month, Binge Alcohol Use in the Past Month, Illicit Drug Use
			Disorder in the Past Year, Serious Mental Illness in the Past Year and Any Mental Illness in
			the Past Year. All data is from people of age 18 or older and show the proportion of people
			which the specific metric holds for.`),yl=P(),da=H("p"),Al=W(`For all these datasets additional to the UFO dataset, we changed state names to state
			abbreviations to create consistent keys.`),hl=P(),ra=H("p"),cl=W(`Because planes are listed as often confused with UFOs [7], we chose to include airport
			locations, too. Our US-airport data [8] comes from October 2020. This dataset was preprocessed
			by simply keeping the columns name, type, latitude_deg, longitude_deg and state, where state
			was derived from the column iso_region. We deleted obvious duplicate datapoints and datapoints
			where the latitude or longitude were obviously outside of US territory, e.g. 0.`),Hl=P(),oa=H("h2"),Ml=W("Learning Goals"),Cl=P(),na=H("p"),Sl=W(`The source code and the used datasets can be found on GitHub [9]. In this project, we learnt
			to collaborate with each other and discuss our thoughts and improvements suggestions on our
			visualization. The presentations in the class taught us how to defend and justify our design
			choices and helped us get valuable feedback to improve our work further. The user study helped
			us see the perspective of people without computer science or visualization background.`),Nl=P(),ke=H("div"),vt=H("p"),fl=W("[1] "),ga=H("a"),Fl=W("https://nuforc.org/databank/"),Ll=P(),Ot=H("p"),Tl=W(`[2] Plaza del Olmo, Julio. (2015). A Review on the Relation between Population Density and
				UFO Sightings. Journal of Scientific Exploration, Vol. 29, No. 3, pp. 425-448. `),pa=H("a"),Rl=W("https://www.scientificexploration.org/docs/29/jse_29_3_PlazadelOlmo.pdf"),kl=P(),Pt=H("p"),Il=W("[3] "),_a=H("a"),vl=W("https://www.census.gov/data/tables/time-series/dec/density-data-text.html"),Ol=P(),Bt=H("p"),Pl=W(`[4] Irwin, Harvey. (1993). Belief in the Paranormal: A Review of the Empirical Literature.
				Journal of American Society for Psychical Research. 87. `),sa=H("a"),Bl=W("https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature"),Wl=P(),Wt=H("p"),bl=W("[5] "),ua=H("a"),wl=W("https://www.pewresearch.org/religion/religious-landscape-study/compare/importance-of-religion-in-ones-life/by/state/"),Dl=P(),bt=H("p"),Kl=W("[6] "),ma=H("a"),Xl=W("https://www.samhsa.gov/data/report/2021-nsduh-state-prevalence-estimates"),El=P(),wt=H("p"),Gl=W("[7] "),ya=H("a"),Vl=W("https://www.livescience.com/32849-7-ways-to-generate-a-great-space-hoax.html"),Jl=P(),Dt=H("p"),Yl=W("[8] "),Aa=H("a"),xl=W("https://data.world/ourairports/989444cc-447b-4030-a866-57fcd6c2d3ee"),Ul=P(),Kt=H("p"),zl=W("[9] "),ha=H("a"),Zl=W("https://github.com/useless-fisualization-operation"),this.h()},l(Wa){t=M(Wa,"DIV",{class:!0});var tt=S(t);a=M(tt,"H1",{class:!0});var rr=S(a);i=b(rr,"About"),rr.forEach(m),l=B(tt),d=M(tt,"DIV",{class:!0});var ut=S(d);r=M(ut,"H2",{class:!0});var or=S(r);o=b(or,"Project Description"),or.forEach(m),s=B(ut),n=M(ut,"P",{class:!0});var nr=S(n);g=b(nr,`Have you ever wondered about extraterrestial activity on earth? Or do you think it's all made
			up and imagined? Or are you still torn between the two? Either way, the Useless Fisualization
			Operation was made for you! Our objective was to allow exploring reports of UFO sightings in
			the USA and uncover underlying patterns.`),nr.forEach(m),u=B(ut),p=M(ut,"P",{class:!0});var gr=S(p);A=b(gr,`With the help of our interactive map you can investigate the locations of UFO sightings,
			filter them, and get detailed reports on demand as well as images if available. By including
			other data such as airport locations, you can decide for yourself if you think the two might
			be correlated. Relationships with further datasets can be explored via a scatterplot, where
			you can filter by years, in case you want to match the time frames of the two datasets.`),gr.forEach(m),h=B(ut),C=M(ut,"P",{class:!0});var pr=S(C);c=b(pr,`To further incorporate the temporal dimension of the data, we have a heatmap showing the
			frequency of UFO sightings per date. Come see for yourself, we hope your time here is out of
			this world.`),pr.forEach(m),f=B(ut),L=M(ut,"P",{class:!0});var _r=S(L);k=b(_r,`Please note that we make no claims on the validity of the reports or the relationships with
			other data, we merely wanted to create a framework for easy and fun exploration.`),_r.forEach(m),ut.forEach(m),T=B(tt),I=M(tt,"DIV",{});var sr=S(I);O=M(sr,"VIDEO",{class:!0});var ur=S(O);J=M(ur,"SOURCE",{src:!0,type:!0}),ur.forEach(m),sr.forEach(m),X=B(tt),j=M(tt,"DIV",{class:!0});var Qa=S(j);R=M(Qa,"H2",{class:!0});var mr=S(R);z=b(mr,"Team"),mr.forEach(m),q=B(Qa),N=M(Qa,"DIV",{class:!0});var mt=S(N);F=M(mt,"DIV",{class:!0});var ca=S(F);v=M(ca,"IMG",{src:!0,class:!0}),E=B(ca),x=M(ca,"P",{class:!0});var yr=S(x);w=b(yr,"Albin Kempe"),yr.forEach(m),$=B(ca),ee=M(ca,"P",{class:!0});var ei=S(ee);Y=b(ei,"Front-End Developer "),U=M(ei,"BR",{}),te=b(ei," UX/UI Designer"),ei.forEach(m),ca.forEach(m),le=B(mt),ie=M(mt,"DIV",{class:!0});var Ha=S(ie);re=M(Ha,"IMG",{src:!0,class:!0}),oe=B(Ha),pe=M(Ha,"P",{class:!0});var Ar=S(pe);Fe=b(Ar,"Annika Oehri"),Ar.forEach(m),Ae=B(Ha),_e=M(Ha,"P",{class:!0});var ti=S(_e);V=b(ti,"Data Engineer "),ae=M(ti,"BR",{}),se=b(ti," Front-End Developer"),ti.forEach(m),Ha.forEach(m),ye=B(mt),Z=M(mt,"DIV",{class:!0});var Ma=S(Z);de=M(Ma,"IMG",{src:!0,class:!0}),Oe=B(Ma),Re=M(Ma,"P",{class:!0});var hr=S(Re);xe=b(hr,"Frawa Vetterli"),hr.forEach(m),be=B(Ma),Pe=M(Ma,"P",{class:!0});var Ca=S(Pe);De=b(Ca,"Data Engineer "),Ue=M(Ca,"BR",{}),Mt=b(Ca,"Front-End Developer "),kt=M(Ca,"BR",{}),qt=b(Ca," UX/UI Designer"),Ca.forEach(m),Ma.forEach(m),It=B(mt),ze=M(mt,"DIV",{class:!0});var Sa=S(ze);pt=M(Sa,"IMG",{src:!0,class:!0}),Ji=B(Sa),$t=M(Sa,"P",{class:!0});var cr=S($t);Yi=b(cr,"Jonathan Cilli"),cr.forEach(m),xi=B(Sa),_t=M(Sa,"P",{class:!0});var Na=S(_t);Ui=b(Na,"Data Engineer "),zi=M(Na,"BR",{}),Zi=b(Na," Front-End Developer "),qi=M(Na,"BR",{}),$i=b(Na," UX/UI Designer"),Na.forEach(m),Sa.forEach(m),ji=B(mt),st=M(mt,"DIV",{class:!0});var fa=S(st);jt=M(fa,"IMG",{src:!0,class:!0}),Qi=B(fa),Qt=M(fa,"P",{class:!0});var Hr=S(Qt);el=b(Hr,"Pedro Burgos"),Hr.forEach(m),tl=B(fa),Tt=M(fa,"P",{class:!0});var ai=S(Tt);al=b(ai,"Front-End Developer "),il=M(ai,"BR",{}),ll=b(ai," UX/UI Designer"),ai.forEach(m),fa.forEach(m),mt.forEach(m),Qa.forEach(m),dl=B(tt),fe=M(tt,"DIV",{class:!0});var ve=S(fe);ea=M(ve,"H2",{class:!0});var Mr=S(ea);rl=b(Mr,"Data"),Mr.forEach(m),ol=B(ve),ta=M(ve,"P",{class:!0});var Cr=S(ta);nl=b(Cr,`The main data on UFO sightings was scraped from the NATIONAL UFO Reporting Center Online
			Database NUFORC [1] on 3th February 2023. We took all fields except for the image links and
			the date of the sighting from the summary, whereas we accessed the report itself to get the
			image and the complete date. We geolocated our datapoints and discarded all sightings whose
			location we could not pinpoint. For the scatter plot and the heatmap, all dates not following
			the month/day/year convention were discarded.`),Cr.forEach(m),gl=B(ve),aa=M(ve,"P",{class:!0});var Sr=S(aa);pl=b(Sr,`A paper by Plaza del Olmo [2] states that their is a sublineal relationship between UFO
			sightings and population density. Based on that, we decided to incorporate absolute population
			and population density data from the United Sates Census Bureau [3] into our visualization.
			The data includes a time dimension with steps of decades, going from 1910 to 2020. It was
			preprocessed by deleting all "regions" datapoints (e.g. midwest) and only keeping columns
			"state", "resident population" and "population density" where the latter is given as number of
			residents per square mile. For the scatterplot, the average between all decades was taken. For
			calculating the number of UFO sightings per person, state and year, we used the interpolated
			values for years originally not in the dataset.`),Sr.forEach(m),_l=B(ve),ia=M(ve,"P",{class:!0});var Nr=S(ia);sl=b(Nr,`Furthermore, a paper by Irwin [4] describes that their might be some relationship between UFO
			sightings and religiosity, although not a proportional one. Therefore, we chose to include a
			dataset on religiosity from 2014 [5] which contains the percentage of people that find
			religion very important, somewhat important, not too important, not at all important and don't
			know how important. Preprocessing was done by changing < 1% to 0 and changing percentages
			to proportions in general (eg. 77% to 0.77).`),Nr.forEach(m),ul=B(ve),la=M(ve,"P",{class:!0});var fr=S(la);ml=b(fr,`During discussions with other students, they said that they would also be interested in a
			visualization of the relationship between UFO sightings and drug use which is why different
			drug use metrics are also included from the Substance Abuse and Mental Health Services
			Administration's National Survey on Drug Use and Health (NSDUH) from 2021 [6]. The metrics
			include Illicit Drug Use in the Past Month, Marijuana Use in the Past Month, Illicit Drug Use
			Other Than Marijuana in the Past Month, Binge Alcohol Use in the Past Month, Illicit Drug Use
			Disorder in the Past Year, Serious Mental Illness in the Past Year and Any Mental Illness in
			the Past Year. All data is from people of age 18 or older and show the proportion of people
			which the specific metric holds for.`),fr.forEach(m),yl=B(ve),da=M(ve,"P",{class:!0});var Fr=S(da);Al=b(Fr,`For all these datasets additional to the UFO dataset, we changed state names to state
			abbreviations to create consistent keys.`),Fr.forEach(m),hl=B(ve),ra=M(ve,"P",{class:!0});var Lr=S(ra);cl=b(Lr,`Because planes are listed as often confused with UFOs [7], we chose to include airport
			locations, too. Our US-airport data [8] comes from October 2020. This dataset was preprocessed
			by simply keeping the columns name, type, latitude_deg, longitude_deg and state, where state
			was derived from the column iso_region. We deleted obvious duplicate datapoints and datapoints
			where the latitude or longitude were obviously outside of US territory, e.g. 0.`),Lr.forEach(m),Hl=B(ve),oa=M(ve,"H2",{class:!0});var Tr=S(oa);Ml=b(Tr,"Learning Goals"),Tr.forEach(m),Cl=B(ve),na=M(ve,"P",{class:!0});var Rr=S(na);Sl=b(Rr,`The source code and the used datasets can be found on GitHub [9]. In this project, we learnt
			to collaborate with each other and discuss our thoughts and improvements suggestions on our
			visualization. The presentations in the class taught us how to defend and justify our design
			choices and helped us get valuable feedback to improve our work further. The user study helped
			us see the perspective of people without computer science or visualization background.`),Rr.forEach(m),Nl=B(ve),ke=M(ve,"DIV",{class:!0});var Be=S(ke);vt=M(Be,"P",{class:!0});var ql=S(vt);fl=b(ql,"[1] "),ga=M(ql,"A",{href:!0});var kr=S(ga);Fl=b(kr,"https://nuforc.org/databank/"),kr.forEach(m),ql.forEach(m),Ll=B(Be),Ot=M(Be,"P",{class:!0});var $l=S(Ot);Tl=b($l,`[2] Plaza del Olmo, Julio. (2015). A Review on the Relation between Population Density and
				UFO Sightings. Journal of Scientific Exploration, Vol. 29, No. 3, pp. 425-448. `),pa=M($l,"A",{href:!0});var Ir=S(pa);Rl=b(Ir,"https://www.scientificexploration.org/docs/29/jse_29_3_PlazadelOlmo.pdf"),Ir.forEach(m),$l.forEach(m),kl=B(Be),Pt=M(Be,"P",{class:!0});var jl=S(Pt);Il=b(jl,"[3] "),_a=M(jl,"A",{href:!0});var vr=S(_a);vl=b(vr,"https://www.census.gov/data/tables/time-series/dec/density-data-text.html"),vr.forEach(m),jl.forEach(m),Ol=B(Be),Bt=M(Be,"P",{class:!0});var Ql=S(Bt);Pl=b(Ql,`[4] Irwin, Harvey. (1993). Belief in the Paranormal: A Review of the Empirical Literature.
				Journal of American Society for Psychical Research. 87. `),sa=M(Ql,"A",{href:!0});var Or=S(sa);Bl=b(Or,"https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature"),Or.forEach(m),Ql.forEach(m),Wl=B(Be),Wt=M(Be,"P",{class:!0});var ed=S(Wt);bl=b(ed,"[5] "),ua=M(ed,"A",{href:!0});var Pr=S(ua);wl=b(Pr,"https://www.pewresearch.org/religion/religious-landscape-study/compare/importance-of-religion-in-ones-life/by/state/"),Pr.forEach(m),ed.forEach(m),Dl=B(Be),bt=M(Be,"P",{class:!0});var td=S(bt);Kl=b(td,"[6] "),ma=M(td,"A",{href:!0});var Br=S(ma);Xl=b(Br,"https://www.samhsa.gov/data/report/2021-nsduh-state-prevalence-estimates"),Br.forEach(m),td.forEach(m),El=B(Be),wt=M(Be,"P",{class:!0});var ad=S(wt);Gl=b(ad,"[7] "),ya=M(ad,"A",{href:!0});var Wr=S(ya);Vl=b(Wr,"https://www.livescience.com/32849-7-ways-to-generate-a-great-space-hoax.html"),Wr.forEach(m),ad.forEach(m),Jl=B(Be),Dt=M(Be,"P",{class:!0});var id=S(Dt);Yl=b(id,"[8] "),Aa=M(id,"A",{href:!0});var br=S(Aa);xl=b(br,"https://data.world/ourairports/989444cc-447b-4030-a866-57fcd6c2d3ee"),br.forEach(m),id.forEach(m),Ul=B(Be),Kt=M(Be,"P",{class:!0});var ld=S(Kt);zl=b(ld,"[9] "),ha=M(ld,"A",{href:!0});var wr=S(ha);Zl=b(wr,"https://github.com/useless-fisualization-operation"),wr.forEach(m),ld.forEach(m),Be.forEach(m),ve.forEach(m),tt.forEach(m),this.h()},h(){y(a,"class","title svelte-fwqw9k"),y(r,"class","svelte-fwqw9k"),y(n,"class","svelte-fwqw9k"),y(p,"class","svelte-fwqw9k"),y(C,"class","svelte-fwqw9k"),y(L,"class","disclaimer svelte-fwqw9k"),y(d,"class","projectdesc svelte-fwqw9k"),yt(J.src,G="ufo_demo_2.mp4")||y(J,"src",G),y(J,"type","video/mp4"),O.controls=!0,O.muted=!0,y(O,"class","svelte-fwqw9k"),y(R,"class","svelte-fwqw9k"),yt(v.src,D="albin.png")||y(v,"src",D),y(v,"class","svelte-fwqw9k"),y(x,"class","name svelte-fwqw9k"),y(ee,"class","role svelte-fwqw9k"),y(F,"class","member svelte-fwqw9k"),yt(re.src,ce="annika.png")||y(re,"src",ce),y(re,"class","svelte-fwqw9k"),y(pe,"class","name svelte-fwqw9k"),y(_e,"class","role svelte-fwqw9k"),y(ie,"class","member svelte-fwqw9k"),yt(de.src,Ie="frawa.png")||y(de,"src",Ie),y(de,"class","svelte-fwqw9k"),y(Re,"class","name svelte-fwqw9k"),y(Pe,"class","role svelte-fwqw9k"),y(Z,"class","member svelte-fwqw9k"),yt(pt.src,lr="jonathan.jpeg")||y(pt,"src",lr),y(pt,"class","svelte-fwqw9k"),y($t,"class","name svelte-fwqw9k"),y(_t,"class","role svelte-fwqw9k"),y(ze,"class","member svelte-fwqw9k"),yt(jt.src,dr="pedro.jpeg")||y(jt,"src",dr),y(jt,"class","svelte-fwqw9k"),y(Qt,"class","name svelte-fwqw9k"),y(Tt,"class","role svelte-fwqw9k"),y(st,"class","member svelte-fwqw9k"),y(N,"class","groupmembers svelte-fwqw9k"),y(j,"class","team svelte-fwqw9k"),y(ea,"class","svelte-fwqw9k"),y(ta,"class","svelte-fwqw9k"),y(aa,"class","svelte-fwqw9k"),y(ia,"class","svelte-fwqw9k"),y(la,"class","svelte-fwqw9k"),y(da,"class","svelte-fwqw9k"),y(ra,"class","svelte-fwqw9k"),y(oa,"class","svelte-fwqw9k"),y(na,"class","svelte-fwqw9k"),y(ga,"href","https://nuforc.org/databank/"),y(vt,"class","svelte-fwqw9k"),y(pa,"href","https://www.scientificexploration.org/docs/29/jse_29_3_PlazadelOlmo.pdf"),y(Ot,"class","svelte-fwqw9k"),y(_a,"href","https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature"),y(Pt,"class","svelte-fwqw9k"),y(sa,"href","https://www.researchgate.net/publication/239592095_Belief_in_the_Paranormal_A_Review_of_the_Empirical_Literature"),y(Bt,"class","svelte-fwqw9k"),y(ua,"href","https://www.pewresearch.org/religion/religious-landscape-study/compare/importance-of-religion-in-ones-life/by/state/"),y(Wt,"class","svelte-fwqw9k"),y(ma,"href","https://www.samhsa.gov/data/report/2021-nsduh-state-prevalence-estimates"),y(bt,"class","svelte-fwqw9k"),y(ya,"href","https://www.livescience.com/32849-7-ways-to-generate-a-great-space-hoax.html"),y(wt,"class","svelte-fwqw9k"),y(Aa,"href","https://data.world/ourairports/989444cc-447b-4030-a866-57fcd6c2d3ee"),y(Dt,"class","svelte-fwqw9k"),y(ha,"href","https://github.com/useless-fisualization-operation"),y(Kt,"class","svelte-fwqw9k"),y(ke,"class","sources svelte-fwqw9k"),y(fe,"class","data svelte-fwqw9k"),y(t,"class","about card svelte-fwqw9k")},m(Wa,tt){K(Wa,t,tt),_(t,a),_(a,i),_(t,l),_(t,d),_(d,r),_(r,o),_(d,s),_(d,n),_(n,g),_(d,u),_(d,p),_(p,A),_(d,h),_(d,C),_(C,c),_(d,f),_(d,L),_(L,k),_(t,T),_(t,I),_(I,O),_(O,J),_(t,X),_(t,j),_(j,R),_(R,z),_(j,q),_(j,N),_(N,F),_(F,v),_(F,E),_(F,x),_(x,w),_(F,$),_(F,ee),_(ee,Y),_(ee,U),_(ee,te),_(N,le),_(N,ie),_(ie,re),_(ie,oe),_(ie,pe),_(pe,Fe),_(ie,Ae),_(ie,_e),_(_e,V),_(_e,ae),_(_e,se),_(N,ye),_(N,Z),_(Z,de),_(Z,Oe),_(Z,Re),_(Re,xe),_(Z,be),_(Z,Pe),_(Pe,De),_(Pe,Ue),_(Pe,Mt),_(Pe,kt),_(Pe,qt),_(N,It),_(N,ze),_(ze,pt),_(ze,Ji),_(ze,$t),_($t,Yi),_(ze,xi),_(ze,_t),_(_t,Ui),_(_t,zi),_(_t,Zi),_(_t,qi),_(_t,$i),_(N,ji),_(N,st),_(st,jt),_(st,Qi),_(st,Qt),_(Qt,el),_(st,tl),_(st,Tt),_(Tt,al),_(Tt,il),_(Tt,ll),_(t,dl),_(t,fe),_(fe,ea),_(ea,rl),_(fe,ol),_(fe,ta),_(ta,nl),_(fe,gl),_(fe,aa),_(aa,pl),_(fe,_l),_(fe,ia),_(ia,sl),_(fe,ul),_(fe,la),_(la,ml),_(fe,yl),_(fe,da),_(da,Al),_(fe,hl),_(fe,ra),_(ra,cl),_(fe,Hl),_(fe,oa),_(oa,Ml),_(fe,Cl),_(fe,na),_(na,Sl),_(fe,Nl),_(fe,ke),_(ke,vt),_(vt,fl),_(vt,ga),_(ga,Fl),_(ke,Ll),_(ke,Ot),_(Ot,Tl),_(Ot,pa),_(pa,Rl),_(ke,kl),_(ke,Pt),_(Pt,Il),_(Pt,_a),_(_a,vl),_(ke,Ol),_(ke,Bt),_(Bt,Pl),_(Bt,sa),_(sa,Bl),_(ke,Wl),_(ke,Wt),_(Wt,bl),_(Wt,ua),_(ua,wl),_(ke,Dl),_(ke,bt),_(bt,Kl),_(bt,ma),_(ma,Xl),_(ke,El),_(ke,wt),_(wt,Gl),_(wt,ya),_(ya,Vl),_(ke,Jl),_(ke,Dt),_(Dt,Yl),_(Dt,Aa),_(Aa,xl),_(ke,Ul),_(ke,Kt),_(Kt,zl),_(Kt,ha),_(ha,Zl)},p:He,i:He,o:He,d(Wa){Wa&&m(t)}}}class P8 extends Ve{constructor(t){super(),Je(this,t,null,O8,Ye,{})}}function B8(e){let t,a,i,l,d,r,o,s,n,g,u,p,A,h;return{c(){t=H("div"),a=H("h4"),i=W("UFO sightings per day of the year"),l=W(`
	Hover over a day or use filters to find out more!
	`),d=H("div"),r=W(`
	year: `),o=H("input"),s=W(` ("all" for all)
	`),n=H("br"),g=P(),u=H("select"),p=P(),A=H("script"),h=W(`function sleep(time) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, time);
			});
		}

		sleep(3000).then(() => {
			// set the dimensions and margins of the graph
			var margin = { top: 30, right: 120, bottom: 40, left: 50 },
				width = 750 - margin.left - margin.right,
				height = 550 - margin.top - margin.bottom;

			// append the svg object to the body of the page
			var svg = d3
				.select('#my_dataviz')
				.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			// Labels of row and columns
			var myGroups = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
			var myVars = [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
				'24',
				'25',
				'26',
				'27',
				'28',
				'29',
				'30',
				'31'
			];

			let tickLabels = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'June',
				'July',
				'Aug',
				'Sept',
				'Oct',
				'Nov',
				'Dec'
			];
			let fullmonths = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			let days_per_month=[31,29,31,30,31,30,31,31,30,31,30,31]
			let state_indices =
				//changed for full rel
				[
					'AK',
					'AL',
					'AR',
					'AZ',
					'CA',
					'CO',
					'CT',
					'DC',
					'DE',
					'FL',
					'GA',
					'HI',
					'IA',
					'ID',
					'IL',
					'IN',
					'KS',
					'KY',
					'LA',
					'MA',
					'MD',
					'ME',
					'MI',
					'MN',
					'MO',
					'MS',
					'MT',
					'NC',
					'ND',
					'NE',
					'NH',
					'NJ',
					'NM',
					'NV',
					'NY',
					'OH',
					'OK',
					'OR',
					'PA',
					'RI',
					'SC',
					'SD',
					'TN',
					'TX',
					'UT',
					'VA',
					'VT',
					'WA',
					'WI',
					'WV',
					'WY',
          			'all'
				];
  			let longStates = {
				AL: 'Alabama',
				AK: 'Alaska',
				AZ: 'Arizona',
				AR: 'Arkansas',
				CA: 'California',
				CO: 'Colorado',
				CT: 'Connecticut',
				DE: 'Delaware',
				DC: 'District of Columbia',
				FL: 'Florida',
				GA: 'Georgia',
				HI: 'Hawaii',
				ID: 'Idaho',
				IL: 'Illinois',
				IN: 'Indiana',
				IA: 'Iowa',
				KS: 'Kansas',
				KY: 'Kentucky',
				LA: 'Louisiana',
				ME: 'Maine',
				MD: 'Maryland',
				MA: 'Massachusetts',
				MI: 'Michigan',
				MN: 'Minnesota',
				MS: 'Mississippi',
				MO: 'Missouri',
				MT: 'Montana',
				NE: 'Nevada',
				NV: 'Nebraska',
				NH: 'New Hampshire',
				NJ: 'New Jersey',
				NM: 'New Mexico',
				NY: 'New York',
				NC: 'North Carolina',
				ND: 'North Dakota',
				OH: 'Ohio',
				OK: 'Oklahoma',
				OR: 'Oregon',
				PA: 'Pennsylvania',
				RI: 'Rhode Island',
				SC: 'South Carolina',
				SD: 'South Dakota',
				TN: 'Tennessee',
				TX: 'Texas',
				UT: 'Utah',
				VT: 'Vermont',
				VA: 'Virginia',
				WA: 'Washington',
				WV: 'West Virginia',
				WI: 'Wisconsin',
				WY: 'Wyoming',
       			 all: 'All States'
			};
			var x = d3
				.scaleBand()
				.range([0, width - 170])
				.domain(myGroups)
				.padding(0.01);
			let xAxisGenerator = d3.axisBottom(x);
			xAxisGenerator.tickFormat((d, i) => tickLabels[i]);
			let xAxis = svg
				.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxisGenerator);


			// Build y scales and axis:
			var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
			svg.append('g').call(d3.axisLeft(y));

			svg
				.append('text') // text label for the x axis
				.attr('x', width / 2)
				.attr('y', height + 0.8 * margin.bottom)
				.style('text-anchor', 'middle')
				.text('Month');

			svg
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', 0 - margin.left)
				.attr('x', 0 - height / 2)
				.attr('dy', '1em')
				.style('text-anchor', 'middle')
				.text('Day');

			let myColor
 			let legend

			// create a tooltip
			let tooltip = d3.select("#my_dataviz")
			.append("div")
			.style("opacity", 0)
			.attr("class", "tooltip")
			.style("background-color", "white")
			.style("border", "solid")
			.style("border-width", "2px")
			.style("border-radius", "5px")
			.style("padding", "5px")
  
			// Three function that change the tooltip when user hover / move / leave a cell
			let mouseover = function(d) {
				tooltip.style("opacity", 1)
				d3.select(this)
				.style("stroke", "black")
			}
			let mousemove = function(d) {
				var day=d.day+"th"
				if(d.day==1||d.day==21||d.day==31){
				day=d.day+"st"
				}
				if(d.day==2||d.day==22){
				day=d.day+"nd"
				}
				if(d.day==3||d.day==23){
				day=d.day+"rd"
				}
				var month=fullmonths[d.month-1]
				var year=d3.select('#year_txt').property('value')
				var text="On the "+day+" of "+month+" there were <br>" + d.frequency+" UFO sightings in year "+year
				if(year=="all"){
					text="On the "+day+" of "+month+" there were <br>" + d.frequency+" UFO sightings in total"
				}
				if(year!="all"){
					if(isNaN(parseInt(year)) || parseInt(year)<1639 || parseInt(year)>2023){
						text="Please enter a year between 1639 and 2023 or \\"all\\" to see the UFO sighting frequency displayed"
					}
				}
				tooltip
				.html(text)
				.style("left", (d3.mouse(this)[0]+70) + "px")
				.style("top", (d3.mouse(this)[1]) + "px")
			}
			let mouseleave = function(d) {
				tooltip.style("opacity", 0)
				d3.select(this)
				.style("stroke", "none")
			}

			//Read the data
			d3.csv("https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoEntireData2.csv", function(data) {
    d3.select('select.stateDrop')
    .on('change', ()=>update(data))
    .selectAll('option')
    .data(state_indices)
    .enter()
    .append('option')
    .attr('value', d=>d)
    .text(d=>longStates[d])

    d3.select('select.stateDrop')
    .property('value','all')

	d3.select('#year_txt').on('change', () => {
					update(data);
				});

	d3.select('#year_txt').property('value', "all");

    myColor = d3.scaleLinear()
      .range(["white", "#ff6f08"])
      .domain([0,2082])
      //.domain([0,d3.max(data_ref, d => d.frequency)])

    legend = d3.legendColor()
      .scale(myColor)
      .labelFormat(d3.format(".0f"))
      .title("Number of UFO Sightings");

	//legend.labels(["hi", "70"])

    svg.append("g")
    .attr("class","legendClass")
      .attr("transform", "translate(500,100)")
      .call(legend);
	
	legend.labels(["hi", "70"])

	svg.select("g").select("legendClass").remove()


    update(data)
  })

  function update(data){
    //data preprocessing (get frequency)
    var state=d3.select('select.stateDrop').property('value')
	var year=d3.select('#year_txt').property('value')
    var tally = {};
    var last_Date='';
    data.forEach(function(line) {
      if(state=='all' || line['State']==state){
        var parts = line['Date'].split(' ');
        var date=parts[0];
        var month=date.split('/')[0]
        var day=date.split('/')[1]
		var yr=date.split('/')[2]
		if(year=='all' || parseInt(yr)==parseInt(year)){
			date=parseInt(day)+'/'+parseInt(month)
			tally[date] = (tally[date]||0) + 1;
			last_Date=date;
		}
      }
    });

    var data_ref = [];
	//reset to 0 first so no undefined and no old values that mean svg wont be overwritten
	for(let monthh=1; monthh<13; monthh++){
		for(let dayy = 1; dayy < days_per_month[monthh-1]+1; dayy++) { 
			var fr=0
			console.log(dayy+'/'+monthh)
			if(!isNaN(parseInt(tally[dayy+'/'+monthh]))){//this date is in data
			fr=tally[dayy+'/'+monthh]
			}
			data_ref.push({
					month: monthh,
					day: dayy,
					frequency: fr
			});
      }
    }

	myColor = d3.scaleLinear()
      .range(["white", "#995e9f"])
      .domain([0,d3.max(data_ref, d => d.frequency)])

	svg.selectAll("rect").remove()

    svg.select("g.legendClass").remove()

    legend = d3.legendColor()
      .scale(myColor)
      .labelFormat(d3.format(".0f"))
      .title("Number of UFO Sightings");

    svg.append("g")
    .attr("class","legendClass")
      .attr("transform", "translate(500,100)")
      .call(legend);
  
    // add the squares
    svg.selectAll()
      .data(data_ref, function(d) {return d.month+':'+d.day;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.month) })
        .attr("y", function(d) { return y(d.day) })
        .attr("rx", 4)
        .attr("ry", 4)
        .style("stroke-width", 2)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.frequency)} )
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  }
		});`),this.h()},l(C){t=M(C,"DIV",{class:!0});var c=S(t);a=M(c,"H4",{class:!0});var f=S(a);i=b(f,"UFO sightings per day of the year"),f.forEach(m),l=b(c,`
	Hover over a day or use filters to find out more!
	`),d=M(c,"DIV",{id:!0}),S(d).forEach(m),r=b(c,`
	year: `),o=M(c,"INPUT",{type:!0,id:!0}),s=b(c,` ("all" for all)
	`),n=M(c,"BR",{}),g=B(c),u=M(c,"SELECT",{class:!0,name:!0}),S(u).forEach(m),p=B(c),A=M(c,"SCRIPT",{});var L=S(A);h=b(L,`function sleep(time) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve();
				}, time);
			});
		}

		sleep(3000).then(() => {
			// set the dimensions and margins of the graph
			var margin = { top: 30, right: 120, bottom: 40, left: 50 },
				width = 750 - margin.left - margin.right,
				height = 550 - margin.top - margin.bottom;

			// append the svg object to the body of the page
			var svg = d3
				.select('#my_dataviz')
				.append('svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

			// Labels of row and columns
			var myGroups = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
			var myVars = [
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
				'11',
				'12',
				'13',
				'14',
				'15',
				'16',
				'17',
				'18',
				'19',
				'20',
				'21',
				'22',
				'23',
				'24',
				'25',
				'26',
				'27',
				'28',
				'29',
				'30',
				'31'
			];

			let tickLabels = [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'June',
				'July',
				'Aug',
				'Sept',
				'Oct',
				'Nov',
				'Dec'
			];
			let fullmonths = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			let days_per_month=[31,29,31,30,31,30,31,31,30,31,30,31]
			let state_indices =
				//changed for full rel
				[
					'AK',
					'AL',
					'AR',
					'AZ',
					'CA',
					'CO',
					'CT',
					'DC',
					'DE',
					'FL',
					'GA',
					'HI',
					'IA',
					'ID',
					'IL',
					'IN',
					'KS',
					'KY',
					'LA',
					'MA',
					'MD',
					'ME',
					'MI',
					'MN',
					'MO',
					'MS',
					'MT',
					'NC',
					'ND',
					'NE',
					'NH',
					'NJ',
					'NM',
					'NV',
					'NY',
					'OH',
					'OK',
					'OR',
					'PA',
					'RI',
					'SC',
					'SD',
					'TN',
					'TX',
					'UT',
					'VA',
					'VT',
					'WA',
					'WI',
					'WV',
					'WY',
          			'all'
				];
  			let longStates = {
				AL: 'Alabama',
				AK: 'Alaska',
				AZ: 'Arizona',
				AR: 'Arkansas',
				CA: 'California',
				CO: 'Colorado',
				CT: 'Connecticut',
				DE: 'Delaware',
				DC: 'District of Columbia',
				FL: 'Florida',
				GA: 'Georgia',
				HI: 'Hawaii',
				ID: 'Idaho',
				IL: 'Illinois',
				IN: 'Indiana',
				IA: 'Iowa',
				KS: 'Kansas',
				KY: 'Kentucky',
				LA: 'Louisiana',
				ME: 'Maine',
				MD: 'Maryland',
				MA: 'Massachusetts',
				MI: 'Michigan',
				MN: 'Minnesota',
				MS: 'Mississippi',
				MO: 'Missouri',
				MT: 'Montana',
				NE: 'Nevada',
				NV: 'Nebraska',
				NH: 'New Hampshire',
				NJ: 'New Jersey',
				NM: 'New Mexico',
				NY: 'New York',
				NC: 'North Carolina',
				ND: 'North Dakota',
				OH: 'Ohio',
				OK: 'Oklahoma',
				OR: 'Oregon',
				PA: 'Pennsylvania',
				RI: 'Rhode Island',
				SC: 'South Carolina',
				SD: 'South Dakota',
				TN: 'Tennessee',
				TX: 'Texas',
				UT: 'Utah',
				VT: 'Vermont',
				VA: 'Virginia',
				WA: 'Washington',
				WV: 'West Virginia',
				WI: 'Wisconsin',
				WY: 'Wyoming',
       			 all: 'All States'
			};
			var x = d3
				.scaleBand()
				.range([0, width - 170])
				.domain(myGroups)
				.padding(0.01);
			let xAxisGenerator = d3.axisBottom(x);
			xAxisGenerator.tickFormat((d, i) => tickLabels[i]);
			let xAxis = svg
				.append('g')
				.attr('transform', 'translate(0,' + height + ')')
				.call(xAxisGenerator);


			// Build y scales and axis:
			var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
			svg.append('g').call(d3.axisLeft(y));

			svg
				.append('text') // text label for the x axis
				.attr('x', width / 2)
				.attr('y', height + 0.8 * margin.bottom)
				.style('text-anchor', 'middle')
				.text('Month');

			svg
				.append('text')
				.attr('transform', 'rotate(-90)')
				.attr('y', 0 - margin.left)
				.attr('x', 0 - height / 2)
				.attr('dy', '1em')
				.style('text-anchor', 'middle')
				.text('Day');

			let myColor
 			let legend

			// create a tooltip
			let tooltip = d3.select("#my_dataviz")
			.append("div")
			.style("opacity", 0)
			.attr("class", "tooltip")
			.style("background-color", "white")
			.style("border", "solid")
			.style("border-width", "2px")
			.style("border-radius", "5px")
			.style("padding", "5px")
  
			// Three function that change the tooltip when user hover / move / leave a cell
			let mouseover = function(d) {
				tooltip.style("opacity", 1)
				d3.select(this)
				.style("stroke", "black")
			}
			let mousemove = function(d) {
				var day=d.day+"th"
				if(d.day==1||d.day==21||d.day==31){
				day=d.day+"st"
				}
				if(d.day==2||d.day==22){
				day=d.day+"nd"
				}
				if(d.day==3||d.day==23){
				day=d.day+"rd"
				}
				var month=fullmonths[d.month-1]
				var year=d3.select('#year_txt').property('value')
				var text="On the "+day+" of "+month+" there were <br>" + d.frequency+" UFO sightings in year "+year
				if(year=="all"){
					text="On the "+day+" of "+month+" there were <br>" + d.frequency+" UFO sightings in total"
				}
				if(year!="all"){
					if(isNaN(parseInt(year)) || parseInt(year)<1639 || parseInt(year)>2023){
						text="Please enter a year between 1639 and 2023 or \\"all\\" to see the UFO sighting frequency displayed"
					}
				}
				tooltip
				.html(text)
				.style("left", (d3.mouse(this)[0]+70) + "px")
				.style("top", (d3.mouse(this)[1]) + "px")
			}
			let mouseleave = function(d) {
				tooltip.style("opacity", 0)
				d3.select(this)
				.style("stroke", "none")
			}

			//Read the data
			d3.csv("https://raw.githubusercontent.com/useless-fisualization-operation/ufo-datasets/main/DataSets/UfoEntireData2.csv", function(data) {
    d3.select('select.stateDrop')
    .on('change', ()=>update(data))
    .selectAll('option')
    .data(state_indices)
    .enter()
    .append('option')
    .attr('value', d=>d)
    .text(d=>longStates[d])

    d3.select('select.stateDrop')
    .property('value','all')

	d3.select('#year_txt').on('change', () => {
					update(data);
				});

	d3.select('#year_txt').property('value', "all");

    myColor = d3.scaleLinear()
      .range(["white", "#ff6f08"])
      .domain([0,2082])
      //.domain([0,d3.max(data_ref, d => d.frequency)])

    legend = d3.legendColor()
      .scale(myColor)
      .labelFormat(d3.format(".0f"))
      .title("Number of UFO Sightings");

	//legend.labels(["hi", "70"])

    svg.append("g")
    .attr("class","legendClass")
      .attr("transform", "translate(500,100)")
      .call(legend);
	
	legend.labels(["hi", "70"])

	svg.select("g").select("legendClass").remove()


    update(data)
  })

  function update(data){
    //data preprocessing (get frequency)
    var state=d3.select('select.stateDrop').property('value')
	var year=d3.select('#year_txt').property('value')
    var tally = {};
    var last_Date='';
    data.forEach(function(line) {
      if(state=='all' || line['State']==state){
        var parts = line['Date'].split(' ');
        var date=parts[0];
        var month=date.split('/')[0]
        var day=date.split('/')[1]
		var yr=date.split('/')[2]
		if(year=='all' || parseInt(yr)==parseInt(year)){
			date=parseInt(day)+'/'+parseInt(month)
			tally[date] = (tally[date]||0) + 1;
			last_Date=date;
		}
      }
    });

    var data_ref = [];
	//reset to 0 first so no undefined and no old values that mean svg wont be overwritten
	for(let monthh=1; monthh<13; monthh++){
		for(let dayy = 1; dayy < days_per_month[monthh-1]+1; dayy++) { 
			var fr=0
			console.log(dayy+'/'+monthh)
			if(!isNaN(parseInt(tally[dayy+'/'+monthh]))){//this date is in data
			fr=tally[dayy+'/'+monthh]
			}
			data_ref.push({
					month: monthh,
					day: dayy,
					frequency: fr
			});
      }
    }

	myColor = d3.scaleLinear()
      .range(["white", "#995e9f"])
      .domain([0,d3.max(data_ref, d => d.frequency)])

	svg.selectAll("rect").remove()

    svg.select("g.legendClass").remove()

    legend = d3.legendColor()
      .scale(myColor)
      .labelFormat(d3.format(".0f"))
      .title("Number of UFO Sightings");

    svg.append("g")
    .attr("class","legendClass")
      .attr("transform", "translate(500,100)")
      .call(legend);
  
    // add the squares
    svg.selectAll()
      .data(data_ref, function(d) {return d.month+':'+d.day;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.month) })
        .attr("y", function(d) { return y(d.day) })
        .attr("rx", 4)
        .attr("ry", 4)
        .style("stroke-width", 2)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", function(d) { return myColor(d.frequency)} )
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)
  }
		});`),L.forEach(m),c.forEach(m),this.h()},h(){y(a,"class","title"),y(d,"id","my_dataviz"),y(o,"type","string"),y(o,"id","year_txt"),y(u,"class","stateDrop"),y(u,"name","stateDrop"),y(t,"class","heatmap svelte-t347tn")},m(C,c){K(C,t,c),_(t,a),_(a,i),_(t,l),_(t,d),_(t,r),_(t,o),_(t,s),_(t,n),_(t,g),_(t,u),_(t,p),_(t,A),_(A,h)},p:He,i:He,o:He,d(C){C&&m(t)}}}class W8 extends Ve{constructor(t){super(),Je(this,t,null,B8,Ye,{})}}function b8(e){let t,a,i,l,d,r,o,s,n,g,u,p,A,h,C,c,f,L,k,T,I,O,J,G,X,j,R,z,q,N,F,v,D,E,x;return l=new l8({}),o=new h8({}),g=new M8({}),A=new N8({}),c=new L8({}),k=new k8({}),O=new t8({}),X=new P8({}),q=new v8({}),D=new W8({}),{c(){t=H("div"),a=H("main"),i=H("div"),Ze(l.$$.fragment),d=P(),r=H("div"),Ze(o.$$.fragment),s=P(),n=H("div"),Ze(g.$$.fragment),u=P(),p=H("div"),Ze(A.$$.fragment),h=P(),C=H("div"),Ze(c.$$.fragment),f=P(),L=H("div"),Ze(k.$$.fragment),T=P(),I=H("div"),Ze(O.$$.fragment),J=P(),G=H("div"),Ze(X.$$.fragment),R=P(),z=H("div"),Ze(q.$$.fragment),F=P(),v=H("div"),Ze(D.$$.fragment),this.h()},l(w){t=M(w,"DIV",{class:!0});var $=S(t);a=M($,"MAIN",{class:!0});var ee=S(a);i=M(ee,"DIV",{class:!0});var Y=S(i);qe(l.$$.fragment,Y),Y.forEach(m),d=B(ee),r=M(ee,"DIV",{class:!0});var U=S(r);qe(o.$$.fragment,U),U.forEach(m),s=B(ee),n=M(ee,"DIV",{class:!0});var te=S(n);qe(g.$$.fragment,te),te.forEach(m),u=B(ee),p=M(ee,"DIV",{class:!0});var le=S(p);qe(A.$$.fragment,le),le.forEach(m),h=B(ee),C=M(ee,"DIV",{class:!0});var ie=S(C);qe(c.$$.fragment,ie),ie.forEach(m),f=B(ee),L=M(ee,"DIV",{class:!0});var re=S(L);qe(k.$$.fragment,re),re.forEach(m),T=B(ee),I=M(ee,"DIV",{class:!0});var ce=S(I);qe(O.$$.fragment,ce),ce.forEach(m),ee.forEach(m),J=B($),G=M($,"DIV",{class:!0});var oe=S(G);qe(X.$$.fragment,oe),oe.forEach(m),R=B($),z=M($,"DIV",{class:!0});var pe=S(z);qe(q.$$.fragment,pe),pe.forEach(m),F=B($),v=M($,"DIV",{class:!0});var Fe=S(v);qe(D.$$.fragment,Fe),Fe.forEach(m),$.forEach(m),this.h()},h(){y(i,"class","header svelte-1sstto3"),y(r,"class","details svelte-1sstto3"),y(n,"class","display_options svelte-1sstto3"),y(p,"class","time_slider svelte-1sstto3"),y(C,"class","footer svelte-1sstto3"),y(L,"class","legend svelte-1sstto3"),y(I,"class","map svelte-1sstto3"),y(a,"class","svelte-1sstto3"),y(G,"class",j="about "+(e[0]==="about"?"active":"hidden")+" svelte-1sstto3"),y(z,"class",N="chart "+(e[0]==="chart"?"active":"hidden")+" svelte-1sstto3"),y(v,"class",E="heatmap "+(e[0]==="heatmap"?"active":"hidden")+" svelte-1sstto3"),y(t,"class","page")},m(w,$){K(w,t,$),_(t,a),_(a,i),$e(l,i,null),_(a,d),_(a,r),$e(o,r,null),_(a,s),_(a,n),$e(g,n,null),_(a,u),_(a,p),$e(A,p,null),_(a,h),_(a,C),$e(c,C,null),_(a,f),_(a,L),$e(k,L,null),_(a,T),_(a,I),$e(O,I,null),_(t,J),_(t,G),$e(X,G,null),_(t,R),_(t,z),$e(q,z,null),_(t,F),_(t,v),$e(D,v,null),x=!0},p(w,[$]){(!x||$&1&&j!==(j="about "+(w[0]==="about"?"active":"hidden")+" svelte-1sstto3"))&&y(G,"class",j),(!x||$&1&&N!==(N="chart "+(w[0]==="chart"?"active":"hidden")+" svelte-1sstto3"))&&y(z,"class",N),(!x||$&1&&E!==(E="heatmap "+(w[0]==="heatmap"?"active":"hidden")+" svelte-1sstto3"))&&y(v,"class",E)},i(w){x||(We(l.$$.fragment,w),We(o.$$.fragment,w),We(g.$$.fragment,w),We(A.$$.fragment,w),We(c.$$.fragment,w),We(k.$$.fragment,w),We(O.$$.fragment,w),We(X.$$.fragment,w),We(q.$$.fragment,w),We(D.$$.fragment,w),x=!0)},o(w){we(l.$$.fragment,w),we(o.$$.fragment,w),we(g.$$.fragment,w),we(A.$$.fragment,w),we(c.$$.fragment,w),we(k.$$.fragment,w),we(O.$$.fragment,w),we(X.$$.fragment,w),we(q.$$.fragment,w),we(D.$$.fragment,w),x=!1},d(w){w&&m(t),je(l),je(o),je(g),je(A),je(c),je(k),je(O),je(X),je(q),je(D)}}}function w8(e,t,a){let i;return ne.subscribe(l=>{a(0,i=l.page)}),[i]}class E8 extends Ve{constructor(t){super(),Je(this,t,w8,b8,Ye,{})}}export{E8 as default};