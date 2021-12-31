# LibraryProjectAngular
Angular framework kullanılarak gerçekleştirilen projede, kitap alınması, iade edilmesi, kütüphane kitaplarının listelenmesi, kullanıcının kitaplarının listelenmesi gibi durum gerçekleştirilmiştir, firebase kullanılmıştır.

# Projede kullanılan teknolojiler
![35](https://user-images.githubusercontent.com/49997690/147836151-fc0f9faa-7758-492f-b915-fe425778988e.PNG)
<br/>

**Angular 13.1.2** <br/>
**Bootstrap 5.1.3** <br/>
**Firebase** <br/>

# Library Project 
<br/>
Projenin amacı,
Sisteme kayıt olup giriş yapan kullanıcılar, belirtilen kategorilerde bulunan kitaplardan istediğini kendi listelerine ekleyebilir, listesinden çıkarabilir<br/>
<br/>

Kullanıcı sisteme kayıt olduğu anda kullanıcı bilgileri Firebase'de kaydedilir. Her bir kullanıcının kendisine ait User UID bilgisi bulunur. <br/>
![1](https://user-images.githubusercontent.com/49997690/147837038-fabf6983-244d-4dca-afe5-001f1aee543f.PNG)<br/>
Kullanıcı sisteme giriş yaptığı zaman, sistem tarafından bu durumlar kontrol edilir. parolanın yanlış girilmesi, yanlış eposta ile giriş yapılması ya da kayıt yaparken girilen eposta daha önce kullanılmışsa hata mesajı ekrana yazdırılır.<br/>

![3](https://user-images.githubusercontent.com/49997690/147837070-aef3e7b5-9721-4bd8-937a-67cdac109380.PNG)<br/>
bu durumlar app/services/error.interceptor.ts dosyasındaki kodlarla kontrol edilir.<br/>
![2](https://user-images.githubusercontent.com/49997690/147837064-a22ec543-54f4-49b8-9b87-69d0099514b3.PNG)<br/>

Başarılı kayıt ve login işleminden sonra, kullanıcı bilgileri tarayıcıda kaydedilir. Geçerli kullanıcının verileri firebase'den çekilerek işlemler gerçekleştirilir.<br/>
![4](https://user-images.githubusercontent.com/49997690/147837149-dc322448-83cd-468b-aa8e-0fb9293772ed.PNG)<br/>
Kullanıcı login durumundayken, sayfa yenilemesi gibi durumlarda login durumu korunur.<br/>
![5](https://user-images.githubusercontent.com/49997690/147837165-e721ff92-e7ce-450f-9e23-94fa66099922.PNG)<br/>
![6](https://user-images.githubusercontent.com/49997690/147837169-214c6217-8f30-45ac-9670-764a3e16622a.PNG)<br/>
![7](https://user-images.githubusercontent.com/49997690/147837179-abefdabb-91c6-4d76-a1ce-e4fc748b4a1a.PNG)<br/>

Herbir kullanıcının bir token bilgisi vardır. bu token bilgisine göre kullanıcının login olup olmama durumu sürekli olarak kontrol edilir. eğer kullanıcının tokenexpirationdate değeri güncel tarih bilgisinden küçükse ya da tokenexpirationdate değeri null ise kullanıcı direk logout durumundadır. <br/>
![34](https://user-images.githubusercontent.com/49997690/147837198-f9308572-c8c1-4d51-8365-c9645797c917.PNG) <br/>

AuthGuard sayesinde, login olmadan sitenin herhangi bir sayfasına erişim sağlanamaz. örneğin login durumunda değilsek, "http://localhost:4200/books" adresine gitmeye çalışırsak bizi doğrudan "http://localhost:4200/auth" kısmına yönlendirecektir.<br/>
![8](https://user-images.githubusercontent.com/49997690/147837185-19bf410d-8db2-4582-b256-08165b32928c.PNG)<br/>
![9](https://user-images.githubusercontent.com/49997690/147837194-27b3afc6-b949-4f0e-8047-699246ed48fe.PNG)<br/>

Kullanıcının Login olma durumuna göre Navbar yapısında erişim bölgeleri kısıtlanabilir. "my books" kısmı sadece kullanıcıya özel bir özellik olduğu için, bu erişim bölgesi sadece login olan kullanıcılara gösterilir.<br/>
![10](https://user-images.githubusercontent.com/49997690/147837236-2076bf52-5ec8-4b4c-adef-f6580432575a.PNG) <br/>
![11](https://user-images.githubusercontent.com/49997690/147837243-17c27d58-d9a3-4844-b319-2c214344e389.PNG) <br/>
bu durumun kontrolü Navbar componentinde tanımladığımız isAuthenticated(boolean) durumuyla kontrol edilir. authService'in subscribe ettiği user bilgileri eğer null değilse demekki bir kullanıcı login durumundadır ve isAuthenticated = true olur.<br/>
![12](https://user-images.githubusercontent.com/49997690/147837264-6e07ea17-22c3-4cef-9b16-53f17f5c959a.PNG) <br/>
navbar.html'de bu durumun kontrolüne göre erişim bölgeleri gösterilir. <br/>
![13](https://user-images.githubusercontent.com/49997690/147837274-78007caf-586d-4d1b-a47d-4325ea55372a.PNG)<br/>
Kullanıcı giriş yaptığı anda kütüphanedeki tüm kitaplar listelenir. <br/>
![31](https://user-images.githubusercontent.com/49997690/147837286-b858844f-a9f6-4b80-a026-1dc083628d38.PNG) <br/>
Bu kitapların türüne göre filtreleme işlemi yapılabilir. eğer çizgi roman türündeki kitapları listelenmek isteniyorsanız çizgi romana tıklayabilirsiniz. <br/>
![14](https://user-images.githubusercontent.com/49997690/147837307-3ff80e0e-ad28-4e1c-a7a6-c385231675d2.PNG) <br/>
search kısmına, ilgilendiğiniz kitabın ismini yazarak ya da kitabın açıklamasıyla ilgili bir şeyler yazarak kitabı sorgulayabilirsiniz.<br/>
![15](https://user-images.githubusercontent.com/49997690/147837320-cb5977e7-dcb9-4493-8226-945b79d8f2d1.PNG) <br/>
bu işlemin aynısını, herhangi bir kategori seçiliykende yapabilirsiniz. sorguyu o kategori içerisinde bulunan kitaplara göre gerçekleştirir.<br/>

Kütüphanede bulunan tüm kitaplara tüm kategoriler sekmesinden erişilebilir. Bu kitaplar firebase'de books altında kayıtlıdır. <br/>
![16](https://user-images.githubusercontent.com/49997690/147837329-701cf469-1945-4143-afff-5c65aadb3521.PNG) <br/>
her kitabın author, description, id, imageUrl, title, type özellikleri vardır. bu özellikler model olarak kayıtlıdır. <br/>
![17](https://user-images.githubusercontent.com/49997690/147837333-ad1685e3-1454-4734-a767-9d9f23942f3f.PNG) <br/>
kitapların id bilgileri firebase'de 0 olarak belirlidir. fakat objeler zaten firebasede firebase'in atadığı idler ile tutulduğu için, firebase'in atadığı id'ler, kod içerisinde objenin id'sine atanıp işlemler gerçekleştirilir. <br/> 
![22](https://user-images.githubusercontent.com/49997690/147837376-f0b1e41a-55e3-4afb-82af-d058140045f8.PNG) <br/>
bookservice yapısıyla, firebase'de bulunan kayıtlı kitaplar "http get" requesti ile çekilebilir. <br/>
![18](https://user-images.githubusercontent.com/49997690/147837341-52809f8b-a4a0-4cd1-843e-008618f5adc0.PNG) <br/>
aynı şekilde navbar üzerinde bulunan " create book" özelliğiyle oluşturduğumuz kitapları "http post" requesti ile firebase'deki book kısmına gönderebiliriz.<br/>
![19](https://user-images.githubusercontent.com/49997690/147837349-e112ae48-9f98-4362-b6ae-6d4335e3d367.PNG) <br/>
Bir kullanıcı login olduğu durumda kütüphanede bulunan herhangi bir kitaba sahip olabilir ya da sahip olduğu kitabı iade edebilir. işlemler firebase üzerinde realtime olarak gerçekleşir. istediği herhangi bir kitabın "add to list" butonuna tıklayarak bu işlemi gerçekleştirebilir. Alertify servisi, gerçekleştirilen durumla ilgili sayfanın sağ altında bir alert belirtir. <br/>
![20](https://user-images.githubusercontent.com/49997690/147837356-40bf7dc7-0781-4ba7-b019-2b815647b83b.PNG) <br/>
yapılan işlem firebase'de görseldeki gibi gözükür. <br/>
![21](https://user-images.githubusercontent.com/49997690/147837366-383c95f0-fa21-487d-8328-3d5d6b224ea5.PNG) <br/>
aynı şekilde almaktan vazgeçtiği, ya da iade etmek istediği kitabı "remove from list" butonuyla iade edebilir. işlemler firebase üzerinde users altında realtime olarak gerçekleştirilir. <br/>
Kişi herhangi bir kitap ya da kategori oluşturmak istiyorsa, navbar üzerinde bulunan "create book", "create category" erişim yerlerine tıklayarak ilgili sayfaya yönlendirilir. <br/>
![26](https://user-images.githubusercontent.com/49997690/147837409-fcf6f7f8-9ab9-4124-9663-d5a93a42411b.PNG)<br/>
oluşturmak istediği kitabın tüm gerekli özellikleri doldurup create buttonuna tıklayabilir. <br/>
![23](https://user-images.githubusercontent.com/49997690/147837390-25bfcaac-9182-4d7f-84e2-0e5d64866ff8.PNG) <br/>
kitap oluşturulduğu anda ana sayfaya yönlendirilir ve alertify servisi ile gerçekleşen işlemin durumu sağ altta gösterilir. <br/>
![24](https://user-images.githubusercontent.com/49997690/147837393-e28ac82c-bb60-45a7-992c-f1c4baa985df.PNG) <br/>
kitap oluşturmak için gerekli olan tüm yerler doldurulmalıdır. yoksa alertify alert hata mesajı gösterir. <br/>
![27](https://user-images.githubusercontent.com/49997690/147837417-3b7b7330-aeec-4c08-9cbf-53f81f6d564b.PNG) <br/>
gerçekleşen işlem firebase realtime olarak işlenir <br/>
![25](https://user-images.githubusercontent.com/49997690/147837399-cc10efc6-d7c7-4c65-bb14-f0745cbafad8.PNG) <br/>
aynı işlemler create category içinde geçerlidir. herhangi bir category oluşturulduğu anda bu işlem firebase üzerinde gerçekleşir ve dinamik olarak site sayfasında kitap kategorileri değişir. <br/>
![28](https://user-images.githubusercontent.com/49997690/147837425-ac9851f4-4ec2-4843-9291-59c48d80a89d.PNG) <br/>
![29](https://user-images.githubusercontent.com/49997690/147837431-60647995-f911-4c1f-a63f-273e14ce73ed.PNG) <br/>
![30](https://user-images.githubusercontent.com/49997690/147837434-9b69d693-19ce-4c70-b0d5-e94e11fc5079.PNG) <br/>

kişi sahip olduğu tüm kitapları görüntülemek için navbar üzerinde bulunan "my books" kısmına tıklayabilir. <br/>
![32](https://user-images.githubusercontent.com/49997690/147837453-59c19c46-a200-438e-8fb3-6f72664a5350.PNG) <br/>
bu kısımda sahip olduğu tüm kitaplar gösterilir. eğer sahip olduğu kitabı iade etmek istersen "remove from list" butonuna tıklayarak kitabı iade edebilir. firebase'de realtime olarak users altında güncellenir. <br/>

kitabı daha detaylı incelemek isterse details butonuna tıklayabilir. <br/>

![33](https://user-images.githubusercontent.com/49997690/147837460-646d9b4f-3adc-493d-b848-83ef490d87ce.PNG) <br/>

kullanıcı sistem çıkmak isterse logout butonuna tıklayarak çıkış yapabilir. çıkış anında kullanıcı bilgileri browser üzerinden silinir. <br/>

OZAN AYDOĞAN KOCAELİ ÜNİVERSİTESİ BİLGİSAYAR MÜHENDİSLİĞİ

