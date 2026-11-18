// عدّل الأسماء والأسعار والوصف من هذه القائمة.
const products = [
  {name:"BMW S1000RR",category:"cars",label:"دراجات نارية",price:"15 دولار",desc:"دراجة رياضية بتصميم BMW وألوان أزرق وأبيض وأحمر.",image:"assets/motorcycle-bmw.png"},
  {name:"Mercedes-Benz G-Class Mansory",category:"cars",label:"سيارات SUV",price:"18 دولار",desc:"مركبة G-Class باللون الأزرق وتعديلات Mansory.",image:"assets/blue-suv.webp"},
  {name:"BMW M4",category:"cars",label:"سيارات رياضية",price:"10 دولار",desc:"سيدان BMW رمادية بتصميم رياضي.",image:"assets/bmw-sedan.png"},
  {name:"فيلا خاصة",category:"realestate",label:"عقارات",price:"يُحدد لاحقاً",desc:"أضف موقع العقار ومميزاته وسعره هنا.",icon:"🏡"},
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
  grid.innerHTML = shown.map(p=>`
    <article class="product">
      <div class="product-art" aria-label="${p.name}">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy">` : p.icon}
      </div>
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
