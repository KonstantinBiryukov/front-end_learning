(function(t){function e(e){for(var a,c,i=e[0],l=e[1],r=e[2],u=0,h=[];u<i.length;u++)c=i[u],o[c]&&h.push(o[c][0]),o[c]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);d&&d(e);while(h.length)h.shift()();return s.push.apply(s,r||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(a=!1)}a&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},o={app:0},s=[];function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var r=0;r<i.length;r++)e(i[r]);var d=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1505:function(t,e,n){},"18ea":function(t,e,n){},"2d94":function(t,e,n){"use strict";var a=n("54d3"),o=n.n(a);o.a},"387f":function(t,e,n){t.exports=n.p+"img/phonebook-logo.png"},"3e17":function(t,e,n){"use strict";var a=n("18ea"),o=n.n(a);o.a},"458f":function(t,e,n){},"505d":function(t,e,n){"use strict";var a=n("60e4"),o=n.n(a);o.a},"54d3":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[t._v("Home")]),t._v("\n    |\n    "),n("router-link",{attrs:{to:"/phoneBook"}},[t._v("PhoneBook")]),t._v("\n    |\n    "),n("router-link",{attrs:{to:"/about"}},[t._v("About")])],1),n("router-view")],1)},s=[],c=(n("5c0b"),n("2877")),i={},l=Object(c["a"])(i,o,s,!1,null,null,null),r=l.exports,d=n("8c4f"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("HelloWorld",{attrs:{msg:"Welcome to Phone Book App"}}),a("img",{attrs:{alt:"Vue logo",src:n("387f")}})],1)},h=[],m=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))])])},f=[],p={name:"HelloWorld",props:{msg:String}},v=p,b=Object(c["a"])(v,m,f,!1,null,null,null),C=b.exports,k={name:"home",components:{HelloWorld:C}},_=k,g=Object(c["a"])(_,u,h,!1,null,null,null),x=g.exports,y=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},w=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"about"},[n("h1",[t._v("This is a phone book app")])])}],N={},P=Object(c["a"])(N,y,w,!1,null,null,null),S=P.exports,A=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",attrs:{id:"phone-book"}},[n("p",{staticClass:"h1 title align-middle font-weight-bold"},[t._v("Phone Book")]),n("div",{staticClass:"row"},[n("div",{staticClass:"header-interface"},[n("search-form",{attrs:{isContactFound:t.isContactFound},on:{search:t.search,reset:t.reset}}),n("div",{staticClass:"interface-col col-md-2 text-center d-inline-block",attrs:{id:"delete-all-interface"}},[n("div",{staticClass:"delete-all-button-wrapper my-3"},[n("button",{staticClass:"btn btn-danger delete-all-button",attrs:{type:"button",title:"Delete all checked contacts"},on:{click:function(e){return t.confirmDelete("deleteAll")}}},[t._v("\n                        Delete all checked contacts\n                    ")]),t.showModal?n("modal",{on:{close:function(e){t.showModal=!1},"delete-contact":t.deleteContact}},[n("h5",{attrs:{slot:"header"},slot:"header"},[t._v("Delete confirmation")])]):t._e()],1)])],1)]),n("div",{staticClass:"row"},[n("table",{staticClass:"col-xl-8 col-md-8 table table-striped table-responsive-md phone-book"},[n("thead",{staticClass:"thead-dark"},[n("tr",[n("th",{staticClass:"align-middle"},[n("label",{staticClass:"checkbox-wrapper"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.allChecked,expression:"allChecked"}],attrs:{type:"checkbox",name:"checkboxes"},domProps:{checked:Array.isArray(t.allChecked)?t._i(t.allChecked,null)>-1:t.allChecked},on:{click:t.checkAll,change:function(e){var n=t.allChecked,a=e.target,o=!!a.checked;if(Array.isArray(n)){var s=null,c=t._i(n,s);a.checked?c<0&&(t.allChecked=n.concat([s])):c>-1&&(t.allChecked=n.slice(0,c).concat(n.slice(c+1)))}else t.allChecked=o}}})])]),n("th",{staticClass:"align-middle"},[t._v("№")]),n("th",{staticClass:"align-middle"},[t._v("Surname")]),n("th",{staticClass:"align-middle"},[t._v("Name")]),n("th",{staticClass:"align-middle"},[t._v("Phone number")]),n("th",{staticClass:"align-middle"})])]),t.contacts.length?n("tbody",{},t._l(t.contacts,function(e,a){return n("tr",{key:e.id},[n("td",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.checkedContactsId,expression:"checkedContactsId"}],attrs:{type:"checkbox",name:"contact"},domProps:{value:e.id,checked:Array.isArray(t.checkedContactsId)?t._i(t.checkedContactsId,e.id)>-1:t.checkedContactsId},on:{click:t.check,change:function(n){var a=t.checkedContactsId,o=n.target,s=!!o.checked;if(Array.isArray(a)){var c=e.id,i=t._i(a,c);o.checked?i<0&&(t.checkedContactsId=a.concat([c])):i>-1&&(t.checkedContactsId=a.slice(0,i).concat(a.slice(i+1)))}else t.checkedContactsId=s}}})]),n("td",{domProps:{textContent:t._s(a+1)}}),n("td",{domProps:{textContent:t._s(e.surname)}}),n("td",{domProps:{textContent:t._s(e.name)}}),n("td",{domProps:{textContent:t._s(e.phoneNumber)}}),n("td",[n("button",{staticClass:"show-modal",attrs:{title:"Delete contact"},on:{click:function(n){return t.confirmDelete(e)}}}),t.showModal?n("modal",{on:{close:function(e){t.showModal=!1},"delete-contact":t.deleteContact}},[n("h5",{attrs:{slot:"header"},slot:"header"},[t._v("Delete confirmation")])]):t._e()],1)])}),0):t._e()]),n("contact-form")],1)])},V=[],O=n("1157"),M=n.n(O),j=function(t,e){return M.a.post({url:t,data:JSON.stringify(e),contentType:"application/json"})},I={deleteContact:function(t){return j("/deleteContact",{id:t})},deleteAll:function(t){return j("/deleteAll",{id:t})},addContact:function(t){return j("/addContact",t)},getContacts:function(t){return M.a.get("/getContacts",{search:t})}},$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"col-xl-4 col-md-4 main-interface-wrapper needs-validation",attrs:{id:"add-contact-form"}},[n("div",{staticClass:"form-row input-form-wrapper"},[n("h2",{staticClass:"add-contact-title w-100 text-center font-weight-bold font-italic"},[t._v("Add contact to phone\n            book")]),n("div",{staticClass:"input-col w-100"},[n("label",{staticClass:"d-block"},[t._v("Surname:\n                "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.name,expression:"name"}],staticClass:"form-control",class:[t.isValidName?"is-valid":"is-invalid"],attrs:{type:"text",id:"surname",title:"Surname",maxlength:"25"},domProps:{value:t.name},on:{input:function(e){e.target.composing||(t.name=e.target.value)}}}),t.isValidName?t._e():n("div",{class:{"invalid-feedback":!t.isValidName},domProps:{textContent:t._s("Surname "+t.invalidMessage)}})])]),n("div",{staticClass:"input-col w-100"},[n("label",{staticClass:"d-block"},[t._v("Name:\n                "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.surname,expression:"surname"}],staticClass:"form-control",class:[t.isValidSurname?"is-valid":"is-invalid"],attrs:{type:"text",id:"name",title:"Name",maxlength:"20"},domProps:{value:t.surname},on:{input:function(e){e.target.composing||(t.surname=e.target.value)}}}),t.isValidSurname?t._e():n("div",{class:{"invalid-feedback":!t.isValidSurname},domProps:{textContent:t._s("Name "+t.invalidMessage)}})])]),n("div",{staticClass:"input-col w-100"},[n("label",{staticClass:"d-block"},[t._v("Phone number:\n                "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.phoneNumber,expression:"phoneNumber"}],staticClass:"form-control",class:[t.isValidPhoneNumber?"is-valid":"is-invalid"],attrs:{type:"text",id:"phone-number",title:"Phone number",maxlength:"10"},domProps:{value:t.phoneNumber},on:{input:function(e){e.target.composing||(t.phoneNumber=e.target.value)}}}),t.isValidPhoneNumber?t._e():n("div",{class:{"invalid-feedback":!t.isValidPhoneNumber},domProps:{textContent:t._s("Phone number "+t.invalidMessage)}})])]),n("button",{staticClass:"btn btn-primary add-button",attrs:{id:"add-contact-button",type:"button"},on:{click:t.addContact}},[t._v("Add to phone book\n        ")])])])},F=[],E=(n("7f7f"),{data:function(){return{name:"",surname:"",phoneNumber:"",isValidName:!0,isValidSurname:!0,isValidPhoneNumber:!0,invalidMessage:""}},methods:{addContact:function(){var t=this,e={name:this.name,surname:this.surname,phoneNumber:this.phoneNumber};""===this.name&&(this.isValidName=!1),""===this.surname&&(this.isValidSurname=!1),""===this.phoneNumber&&(this.isValidPhoneNumber=!1),""!==this.name&&""!==this.surname&&""!==this.phoneNumber?(this.isValidName=!0,this.isValidSurname=!0,this.isValidPhoneNumber=!0,I.addContact(e).done(function(e){var n=e.message;!1===e.success?(t.isValidPhoneNumber=!1,t.invalidMessage=n):(t.name="",t.surname="",t.phoneNumber="",t.$parent.loadContacts(),t.isValidPhoneNumber=!0)})):this.invalidMessage="is not defined"}}}),T=E,D=(n("3e17"),Object(c["a"])(T,$,F,!1,null,null,null)),B=D.exports,W=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"modal-template"}},[n("transition",{attrs:{name:"modal"}},[n("div",{staticClass:"modal-mask"},[n("div",{staticClass:"modal-wrapper"},[n("div",{staticClass:"modal-container"},[n("div",{staticClass:"modal-header"},[t._t("header",[t._v("\n                            default header\n                        ")])],2),n("div",{staticClass:"modal-body"},[t._t("body",[t._v("\n                            Would you like to delete this contact(s) ?\n                        ")])],2),n("div",{staticClass:"modal-footer"},[t._t("footer",[n("button",{staticClass:"modal-default-button",attrs:{id:"close"},on:{click:function(e){return t.$emit("close")}}},[t._v("\n                                No\n                            ")]),n("button",{staticClass:"modal-default-button",attrs:{id:"yes"},on:{click:t.deleteContact}},[t._v("\n                                Yes\n                            ")])])],2)])])])])],1)},H=[],R={methods:{deleteContact:function(){this.$emit("delete-contact")}}},J=R,Y=(n("2d94"),Object(c["a"])(J,W,H,!1,null,null,null)),q=Y.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("nav",{staticClass:"search-field navbar navbar-light bg-light interface-col text-center d-inline-block"},[n("div",{staticClass:"form-inline search"},[n("div",{directives:[{name:"show",rawName:"v-show",value:!t.isContactFound,expression:"!isContactFound"}],staticClass:"contact-not-found"},[t._v("Contact not found...")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.searchField,expression:"searchField"}],staticClass:"form-control mr-sm-2",attrs:{id:"contacts-search",type:"search",placeholder:"Search contact","aria-label":"Search",maxlength:"25"},domProps:{value:t.searchField},on:{input:function(e){e.target.composing||(t.searchField=e.target.value)}}}),n("button",{staticClass:"btn btn-outline-primary my-2 mx-sm-2 search-button",attrs:{type:"button"},on:{click:function(e){return t.$emit("search",t.searchField)}}},[t._v("Search\n        ")]),n("button",{staticClass:"btn btn-outline-secondary my-2 mx-2 reset-button",attrs:{type:"button"},on:{click:function(e){return t.$emit("reset")}}},[t._v("Reset\n        ")])])])},G=[],K={props:{isContactFound:Boolean},data:function(){return{searchField:""}}},L=K,Q=(n("a011"),Object(c["a"])(L,z,G,!1,null,null,null)),U=Q.exports,X=(n("f9e3"),n("f507"),n("17fb")),Z=n.n(X),tt={components:{modal:q,contactForm:B,searchForm:U},data:function(){return{contacts:[],usedSearchTerm:"",checked:!1,checkedContactsId:[],allChecked:!1,showModal:!1,selectedContact:null,isContactFound:!0}},created:function(){this.loadContacts()},methods:{deleteContact:function(){var t=this;if(null===this.selectedContact)return this.deleteAll(),void(this.showModal=!1);I.deleteContact(this.selectedContact.id).done(function(){t.loadContacts()}),this.showModal=!1,this.selectedContact=null},deleteAll:function(){var t=this;I.deleteAll(this.checkedContactsId).done(function(){t.loadContacts()}),this.showModal=!1,this.allChecked=!1},loadContacts:function(){var t=this;I.getContacts(this.usedSearchTerm).done(function(e){t.contacts=e.contacts,t.isContactFound=e.success;var n=t.contacts.map(function(t){return t.id});t.checkedContactsId=Z.a.intersection(n,t.checkedContactsId)})},checkAll:function(){this.checkedContactsId=[],this.allChecked||(this.checkedContactsId=this.contacts.map(function(t){return t.id}))},check:function(){this.allChecked=!1},confirmDelete:function(t){(this.checkedContactsId.length||"deleteAll"!==t)&&(this.showModal=!0),"deleteAll"!==t&&(this.selectedContact=t)},search:function(t){this.usedSearchTerm=t,this.loadContacts()},reset:function(){this.usedSearchTerm="",this.checkedContactsId=[],this.allChecked=!1,this.loadContacts()}}},et=tt,nt=(n("505d"),Object(c["a"])(et,A,V,!1,null,null,null)),at=nt.exports,ot=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"error"},[t._v("ERROR 404. Page not found.")])},st=[],ct={name:"Page404"},it=ct,lt=(n("b981"),Object(c["a"])(it,ot,st,!1,null,"612d44a4",null)),rt=lt.exports;a["a"].use(d["a"]);var dt=new d["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:x},{path:"/about",name:"about",component:S},{path:"/phoneBook",name:"phoneBook",component:at},{path:"*",component:rt}]}),ut=n("2f62");a["a"].use(ut["a"]);var ht=new ut["a"].Store({state:{},mutations:{},actions:{}});a["a"].config.productionTip=!1,new a["a"]({router:dt,store:ht,render:function(t){return t(r)}}).$mount("#phone-book")},"5c0b":function(t,e,n){"use strict";var a=n("458f"),o=n.n(a);o.a},"60e4":function(t,e,n){},a011:function(t,e,n){"use strict";var a=n("d18d"),o=n.n(a);o.a},b981:function(t,e,n){"use strict";var a=n("1505"),o=n.n(a);o.a},d18d:function(t,e,n){}});
//# sourceMappingURL=app.js.map