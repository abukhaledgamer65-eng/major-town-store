// عدّل المنتجات والأسعار من هذه القائمة فقط.
const products = [
  {name:"سيارة رياضية مميزة",category:"cars",label:"سيارات",price:"يُحدد لاحقاً",desc:"أضف تفاصيل السيارة وصورها وسعرها هنا.",icon:"🚘"},
  {name:"سيارة فاخرة",category:"cars",label:"سيارات",price:"يُحدد لاحقاً",desc:"مركبة مميزة لعشاق القيادة داخل المدينة.",icon:"🏎️"},
  {name:"فيلا خاصة",category:"realestate",label:"عقارات",price:"يُحدد لاحقاً",desc:"أضف موقع العقار ومميزاته وسعره هنا.",icon:"🏡"},
  {name:"منزل عائلي",category:"realestate",label:"عقارات",price:"يُحدد لاحقاً",desc:"منزل خاص ضمن عالم المدينة.",icon:"🏠"},
  {name:"مطعم خاص",category:"business",label:"مشاريع خاصة",price:"يُحدد لاحقاً",desc:"فرصة لامتلاك وإدارة مشروع مطعم داخل المدينة.",icon:"🍽️"},
  {name:"ورشة سيارات",category:"workshops",label:"ورشات",price:"يُحدد لاحقاً",desc:"مشروع صيانة وتعديل مركبات داخل المدينة.",icon:"🔧"}
];
const grid = document.getElementById("productGrid");
const count = document.getElementById("resultCount");
const toast = document.getElementById("toast");
let currentFilter = "all";
function render(){
  const shown = currentFilter==="all" ? products : products.filter(p=>p.category===currentFilter);
  count.textContent = `${shown.length} عروض`;
  grid.innerHTML = shown.map((p,i)=>`
    <article class="product">
      <div class="product-art" aria-label="${p.name}">${p.icon}</div>
      <div class="product-info">
        <small>${p.label}</small><h3>${p.name}</h3><p>${p.desc}</p>
        <div class="product-bottom"><span class="price">${p.price}</span>
        <button class="order" data-index="${products.indexOf(p)}">اطلب الآن</button></div>
      </div>
    </article>`).join("");
}
document.querySelectorAll(".category").forEach(btn=>{
  btn.addEventListener("click",()=>{
    document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");currentFilter=btn.dataset.filter;render();
  });
});
grid.addEventListener("click",async e=>{
  const btn=e.target.closest(".order");if(!btn)return;
  const p=products[Number(btn.dataset.index)];
  const message=`مرحباً، أريد الاستفسار عن: ${p.name} — MAJOR TOWN STORE`;
  try{await navigator.clipboard.writeText(message);toast.textContent="تم نسخ رسالة الطلب. أرسلها للإدارة عبر ديسكورد أو وسيلة التواصل المعتمدة.";}
  catch{toast.textContent=message;}
  toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),4200);
});
render();
