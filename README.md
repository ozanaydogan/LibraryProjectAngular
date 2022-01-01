# LibraryProjectAngular
In the project carried out using Angular, situations such as buying and returning books, listing library books, listing user books were carried out, and firebase was used.

# Used Technologies
![35](https://user-images.githubusercontent.com/49997690/147836151-fc0f9faa-7758-492f-b915-fe425778988e.PNG)
<br/>

**Angular 13.1.2** <br/>
**Bootstrap 5.1.3** <br/>
**Firebase** <br/>
**Node.js v16.13.1** <br/>
<br/>

# Library Project 
<br/>
The purpose of the project, users who have registered and logged in to the system can add or remove from their own list the books found in the specified categories.
<br/>
<br/>

As soon as the user registers in the system, the user information is saved in Firebase. Each user has their own User UID. <br/>
![1](https://user-images.githubusercontent.com/49997690/147837038-fabf6983-244d-4dca-afe5-001f1aee543f.PNG)<br/>
<br/>
When the user logs into the system, these conditions are checked by the system. If the password is entered incorrectly, logged in with the wrong e-mail, or the e-mail entered during registration has been used before, an error message will be printed on the screen.<br/>
![3](https://user-images.githubusercontent.com/49997690/147837070-aef3e7b5-9721-4bd8-937a-67cdac109380.PNG)<br/>
<br/>
These situations are controlled by the codes in the app/services/error.interceptor.ts file.<br/>
![2](https://user-images.githubusercontent.com/49997690/147837064-a22ec543-54f4-49b8-9b87-69d0099514b3.PNG)<br/><br/>

After successful registration and login, user information is saved in the browser. Transactions are performed by pulling the current user's data from firebase.<br/>
![4](https://user-images.githubusercontent.com/49997690/147837149-dc322448-83cd-468b-aa8e-0fb9293772ed.PNG)<br/>
<br/>
While the user is in the login state, the login state is preserved in case of page refresh..<br/>
![5](https://user-images.githubusercontent.com/49997690/147837165-e721ff92-e7ce-450f-9e23-94fa66099922.PNG)<br/>
![6](https://user-images.githubusercontent.com/49997690/147837169-214c6217-8f30-45ac-9670-764a3e16622a.PNG)<br/>
![7](https://user-images.githubusercontent.com/49997690/147837179-abefdabb-91c6-4d76-a1ce-e4fc748b4a1a.PNG)<br/>
<br/>

Each user has a token information. According to this token information, the user's login status is constantly checked. If the user's tokenexpirationdate value is less than the current date information or if the tokenexpirationdate value is null, the user is in a direct logout state. <br/>
![34](https://user-images.githubusercontent.com/49997690/147837198-f9308572-c8c1-4d51-8365-c9645797c917.PNG) <br/>
<br/>

Thanks to AuthGuard, it is not possible to access any page of the site without login. for example if we are not in login state, if we try to go to "http://localhost:4200/books" it will redirect us directly to "http://localhost:4200/auth".<br/>
![8](https://user-images.githubusercontent.com/49997690/147837185-19bf410d-8db2-4582-b256-08165b32928c.PNG)<br/>
![9](https://user-images.githubusercontent.com/49997690/147837194-27b3afc6-b949-4f0e-8047-699246ed48fe.PNG)<br/>
<br/>
Access zones can be restricted in the Navbar structure depending on the user's login status. Since the "my books" section is only a user-specific feature, this access zone is only shown to logged in users.<br/>
![10](https://user-images.githubusercontent.com/49997690/147837236-2076bf52-5ec8-4b4c-adef-f6580432575a.PNG) <br/>
![11](https://user-images.githubusercontent.com/49997690/147837243-17c27d58-d9a3-4844-b319-2c214344e389.PNG) <br/>
<br/>
The control of this state is controlled by the isAuthenticated(boolean) state that we defined in the Navbar component. If the user information subscribed by the authService is not null, then a user is in the login state and is "isAuthenticated = true".<br/>
![12](https://user-images.githubusercontent.com/49997690/147837264-6e07ea17-22c3-4cef-9b16-53f17f5c959a.PNG) <br/><br/>
In navbar.html, access zones are shown according to the control of this state. <br/>
![13](https://user-images.githubusercontent.com/49997690/147837274-78007caf-586d-4d1b-a47d-4325ea55372a.PNG)<br/><br/>
As soon as the user logs in, all the books in the library are listed. <br/>
![31](https://user-images.githubusercontent.com/49997690/147837286-b858844f-a9f6-4b80-a026-1dc083628d38.PNG) <br/><br/>
Filtering can be done according to the type of these books. If you want to list the books in the comic book genre, you can click on the comic. <br/>
![14](https://user-images.githubusercontent.com/49997690/147837307-3ff80e0e-ad28-4e1c-a7a6-c385231675d2.PNG) <br/><br/>
You can search the book by typing the name of the book you are interested in in the search section or by typing something about the description of the book.<br/>
![15](https://user-images.githubusercontent.com/49997690/147837320-cb5977e7-dcb9-4493-8226-945b79d8f2d1.PNG) <br/>
You can do the same with any category selected. performs the query according to the books in that category.<br/><br/>

All books in the library can be accessed from the all categories tab. These books are registered under books on firebase. <br/>
![16](https://user-images.githubusercontent.com/49997690/147837329-701cf469-1945-4143-afff-5c65aadb3521.PNG) <br/><br/>
Each book has author, description, id, imageUrl, title, type attributes. These features are registered as models. <br/>
![17](https://user-images.githubusercontent.com/49997690/147837333-ad1685e3-1454-4734-a767-9d9f23942f3f.PNG) <br/><br/>
The id information of the books is determined as 0 in firebase. but since the objects are already kept in firebase with the ids assigned by firebase, the ids assigned by firebase are assigned to the id of the object in the code and operations are performed. <br/> 
![22](https://user-images.githubusercontent.com/49997690/147837376-f0b1e41a-55e3-4afb-82af-d058140045f8.PNG) <br/><br/>
With the bookservice structure, the saved books in firebase can be retrieved with the "http get" request. <br/>
![18](https://user-images.githubusercontent.com/49997690/147837341-52809f8b-a4a0-4cd1-843e-008618f5adc0.PNG) <br/><br/>
In the same way, we can send the books we created with the "create book" feature on the navbar to the book section in firebase with "http post" request.<br/>
![19](https://user-images.githubusercontent.com/49997690/147837349-e112ae48-9f98-4362-b6ae-6d4335e3d367.PNG) <br/><br/>
In case a user is logged in, he can own any book in the library or return the book he owns. Transactions take place in realtime on firebase. You can do this by clicking the "add to list" button of any book you want. The Alertify service indicates an alert at the bottom right of the page regarding the status performed. <br/>
![20](https://user-images.githubusercontent.com/49997690/147837356-40bf7dc7-0781-4ba7-b019-2b815647b83b.PNG) <br/><br/>
The process looks like the image in firebase. <br/>
![21](https://user-images.githubusercontent.com/49997690/147837366-383c95f0-fa21-487d-8328-3d5d6b224ea5.PNG) <br/><br/>
In the same way, he can return the book that he has refused to buy or that he wants to return, by clicking the "remove from list" button. Operations are performed in realtime under users on firebase. <br/>
If the person wants to create any book or category, they are directed to the relevant page by clicking on the "create book", "create category" access places on the navbar.<br/>
![26](https://user-images.githubusercontent.com/49997690/147837409-fcf6f7f8-9ab9-4124-9663-d5a93a42411b.PNG)<br/><br/>
He can fill in all the necessary features of the book he wants to create and click the create button. <br/>
![23](https://user-images.githubusercontent.com/49997690/147837390-25bfcaac-9182-4d7f-84e2-0e5d64866ff8.PNG) <br/><br/>
As soon as the book is created, it is directed to the main page and the status of the transaction with the alertify service is shown at the bottom right. <br/>
![24](https://user-images.githubusercontent.com/49997690/147837393-e28ac82c-bb60-45a7-992c-f1c4baa985df.PNG) <br/><br/>
All fields required to create a book must be filled in. otherwise it will show alertify alert error message. <br/>
![27](https://user-images.githubusercontent.com/49997690/147837417-3b7b7330-aeec-4c08-9cbf-53f81f6d564b.PNG) <br/><br/>
The process takes place in realtime on firebase <br/>
![25](https://user-images.githubusercontent.com/49997690/147837399-cc10efc6-d7c7-4c65-bb14-f0745cbafad8.PNG) <br/><br/>
same operations apply in create category. As soon as any category is created, this process takes place on firebase and the book categories change dynamically on the site page. <br/><br/>
![28](https://user-images.githubusercontent.com/49997690/147837425-ac9851f4-4ec2-4843-9291-59c48d80a89d.PNG) <br/>
![29](https://user-images.githubusercontent.com/49997690/147837431-60647995-f911-4c1f-a63f-273e14ce73ed.PNG) <br/>
![30](https://user-images.githubusercontent.com/49997690/147837434-9b69d693-19ce-4c70-b0d5-e94e11fc5079.PNG) <br/>
<br/>
The person can click on the "my books" section on the navbar to view all the books he owns. <br/>
![32](https://user-images.githubusercontent.com/49997690/147837453-59c19c46-a200-438e-8fb3-6f72664a5350.PNG) <br/> <br/>
In this section, all the books he owns are shown. If you want to return the book he has, he can return the book by clicking the "remove from list" button. It is updated in realtime under users in firebase. <br/><br/>

If you want to examine the book in more detail, you can click the details button. <br/>

![33](https://user-images.githubusercontent.com/49997690/147837460-646d9b4f-3adc-493d-b848-83ef490d87ce.PNG) <br/><br/>

If the user wants to exit the system, he can log out by clicking the logout button. User information is deleted from the browser at the time of exit. <br/>

OZAN AYDOĞAN KOCAELİ UNIVERSITY COMPUTER ENGINEERING

