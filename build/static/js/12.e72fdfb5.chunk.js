(this["webpackJsonpawesome-react-portfolio"]=this["webpackJsonpawesome-react-portfolio"]||[]).push([[12],{132:function(e,t,n){"use strict";n(0),n(383),n(391),n(42),n(455),n(2)},446:function(e,t,n){"use strict";n.r(t);var a=n(18),c=n(0),i=n.n(c),o=n(90),r=n(78),s=n(437),l=n(438),u=n(452),j=n(415),b=n(457),d=n(442),m=n(4),p=n(135),O=n(2),f=["setHomeIsActive"],x=Object(j.a)((function(e){return{root:{cursor:"pointer"}}})),h=function(e){var t=e.setHomeIsActive,n=(Object(m.a)(e,f),x());return Object(O.jsx)(p.Link,{spy:!0,smooth:!0,duration:500,offset:-70,to:"home",onSetActive:function(){return t(!0)},onSetInactive:function(){return t(!1)},className:n.root,children:Object(O.jsx)("img",{src:"images/shahzaib-home-white.png",alt:"logo",width:"180px"})})},g=n(31),v=n(418),y=n(421),w=n(38),C=n(422),k=n(445),I=(n(390),n(435),n(434),n(34),n(455)),S=(n(382),Object(j.a)((function(e){return{profileMenu:{"& .MuiPaper-root":{backgroundColor:e.palette.primary.main,marginTop:"2px",boxShadow:e.shadows[4]}},menuItem:{"&:hover":{backgroundColor:e.backgroundSecondary}},flagIcon:{marginRight:e.spacing(1)}}})),n(40)),N={spy:!0,smooth:!0,offset:-70,duration:500},A=i.a.forwardRef((function(e,t){return Object(O.jsx)(d.a.div,{ref:t,custom:e.custom,animate:e.animate,children:Object(O.jsx)(p.Link,Object(g.a)(Object(g.a)({},N),e))})})),E=Object(j.a)((function(e){return{wrapper:{display:"flex",alignItems:"center"},tabs:{marginRight:e.spacing(4)},navMenuItem:{marginRight:e.spacing(1)}}})),_=Object(w.a)((function(e){return{root:{transition:".2s",minWidth:120,"&:hover":{color:e.palette.text.primary}}}}))((function(e){return Object(O.jsx)(C.a,Object(g.a)({disableRipple:!0},e))})),L=Object(w.a)({indicator:{"& > span":{maxWidth:20}}})((function(e){return Object(O.jsx)(k.a,Object(g.a)(Object(g.a)({},e),{},{variant:"fullWidth",TabIndicatorProps:{children:Object(O.jsx)("span",{})}}))})),M=function(e){var t=e.homeIsActive,n=E(),i=Object(c.useState)(!1),o=Object(a.a)(i,2),r=o[0],s=o[1],l=Object(c.useState)(!1),u=Object(a.a)(l,2),j=u[0],m=u[1],f=Object(c.useContext)(S.a).isLoading,x=Object(b.a)(),h=Object(I.a)().t;Object(c.useEffect)((function(){p.Events.scrollEvent.register("begin",(function(e,t){m(!0)})),p.Events.scrollEvent.register("end",(function(e,t){m(!1)}))})),Object(c.useEffect)((function(){f?x.start({opacity:0,y:-5}):x.start((function(e){return{y:0,opacity:1,transition:{delay:.1*e+.3}}}))}),[f,x]);var g=function(e){j||s(e)};return Object(c.useEffect)((function(){t&&s(!1)}),[t]),Object(O.jsxs)("div",{className:n.wrapper,children:[Object(O.jsxs)(L,{className:n.tabs,value:r,indicatorColor:"primary",textColor:"primary",onChange:function(e,t){s(t)},"aria-label":"disabled tabs example",children:[Object(O.jsx)(_,{component:A,custom:0,animate:x,to:"about",label:h("menu_about"),onSetActive:function(){return g(0)},onSetInactive:function(){return g(!1)}}),Object(O.jsx)(_,{component:A,animate:x,custom:1,to:"experience",label:h("menu_experience"),onSetActive:function(){return g(1)}}),Object(O.jsx)(_,{component:A,animate:x,custom:2,to:"projects",label:h("menu_projects"),onSetActive:function(){return g(2)}}),Object(O.jsx)(_,{component:A,animate:x,custom:3,to:"contact",label:h("menu_contact"),onSetActive:function(){return g(3)}})]}),Object(O.jsx)(d.a.div,{custom:4,animate:x,children:Object(O.jsx)(v.a,{component:y.a,href:"/resume.pdf",variant:"outlined",color:"primary",underline:"none",children:h("menu_resume")})})]})},R=n(451),H=n(433),T=n(436),D=n(384),W=(n(132),Object(j.a)((function(e){return{drawer:{backgroundColor:e.palette.background.default},list:{width:250},fullList:{width:"auto",marginTop:e.spacing(4)},listItem:{display:"flex",justifyContent:"center",padding:e.spacing(2,0),"&:hover":{backgroundColor:"rgb(80,80,80)"}},btnContainer:{display:"flex",justifyContent:"center",marginTop:e.spacing(1)},active:{backgroundColor:e.palette.primary.main}}}))),B=function(e){var t=e.open,n=e.onClose,a=(e.onOpen,W()),c=Object(I.a)().t,i={button:!0,component:p.Link,onClick:n,onKeyDown:n,spy:!0,smooth:!0,offset:0,duration:500,className:a.listItem,activeClass:a.active};return Object(O.jsx)(R.a,{anchor:"left",open:t,onClose:n,classes:{paper:a.drawer},children:Object(O.jsx)("div",{className:a.list,role:"presentation",children:Object(O.jsxs)(H.a,{className:a.fullList,children:[Object(O.jsx)(T.a,Object(g.a)(Object(g.a)({},i),{},{to:"about",children:c("menu_about")})),Object(O.jsx)(T.a,Object(g.a)(Object(g.a)({},i),{},{to:"experience",children:c("menu_experience")})),Object(O.jsx)(T.a,Object(g.a)(Object(g.a)({},i),{},{to:"projects",children:c("menu_projects")})),Object(O.jsx)(T.a,Object(g.a)(Object(g.a)({},i),{},{to:"contact",children:c("menu_contact")})),Object(O.jsx)(T.a,{className:a.btnContainer,children:Object(O.jsx)(v.a,{component:y.a,href:"/resume.pdf",variant:"outlined",color:"primary",underline:"none",children:c("menu_resume")})}),Object(O.jsx)(D.a,{})]})})})},J=["isOpen"],P=Object(j.a)((function(e){return{container:{overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"flex-end",cursor:"pointer",padding:"2px"},line:{height:"3px",backgroundColor:e.palette.text.secondary},line1:{width:"35px",marginBottom:"7px"},line2:{width:"25px",marginBottom:"7px"},line3:{width:"35px"}}})),U=function(e){var t=e.isOpen,n=Object(m.a)(e,J),a=Object(b.a)(),i=P();return Object(c.useEffect)((function(){t?a.start("animate"):a.start("initial")}),[t,a]),Object(O.jsxs)(d.a.div,Object(g.a)(Object(g.a)({className:i.container},n),{},{children:[Object(O.jsx)(d.a.div,{className:"".concat(i.line," ").concat(i.line1),variants:{initial:{rotate:0,y:0},animate:{rotate:45,y:9}},animate:a}),Object(O.jsx)(d.a.div,{className:"".concat(i.line," ").concat(i.line2),variants:{initial:{x:0,opacity:1},animate:{x:250,opacity:0}},animate:a}),Object(O.jsx)(d.a.div,{className:"".concat(i.line," ").concat(i.line3),variants:{initial:{rotate:0,y:0},animate:{rotate:-45,y:-9}},animate:a})]}))},z=Object(j.a)((function(e){return{logo:{width:"150px"},navbar:{backgroundColor:e.palette.background.default},toolbar:{justifyContent:"space-between",alignItems:"center",padding:function(t){return t.isMobile?e.spacing(0,2):e.spacing(0,6)}}}})),K=function(){var e=Object(c.useState)(!0),t=Object(a.a)(e,2),n=t[0],i=t[1],j=Object(o.a)("(max-width:700px)"),m=Object(c.useContext)(S.a).isLoading,p=Object(b.a)(),f=Object(r.a)(),x=Object(c.useState)(!1),g=Object(a.a)(x,2),v=g[0],y=g[1],w=Object(c.useState)(!1),C=Object(a.a)(w,2),k=C[0],I=C[1],N=z({scroll:v,isMobile:j});window.addEventListener("scroll",(function(){return y(window.scrollY>30)}));var A={initial:{height:j?70:100,boxShadow:f.shadows[0]},scrolled:{height:f.navbarHeight,boxShadow:f.shadows[10]}};return Object(c.useEffect)((function(){m?p.start({y:-100}):p.start({y:0,transition:{delay:.05,type:"spring",stiffness:260,damping:20}})}),[m,p]),Object(O.jsxs)(d.a.div,{animate:p,children:[Object(O.jsx)(s.a,{position:"fixed",elevation:0,className:N.navbar,component:"nav",children:Object(O.jsxs)(l.a,{className:N.toolbar,component:d.a.div,variants:A,animate:v?"scrolled":"initial",transition:{type:"spring",stiffness:260,damping:20},children:[Object(O.jsx)(h,{className:N.logo,setHomeIsActive:i}),Object(O.jsx)(u.a,{smDown:!0,children:Object(O.jsx)(M,{homeIsActive:n})}),Object(O.jsx)(u.a,{mdUp:!0,children:Object(O.jsx)(U,{isOpen:k,onClick:function(){return I(!k)}})})]})}),Object(O.jsx)(u.a,{mdUp:!0,children:Object(O.jsx)(B,{open:k,onClose:function(){return I(!1)},onOpen:function(){return I(!0)}})})]})};t.default=K}}]);
//# sourceMappingURL=12.e72fdfb5.chunk.js.map