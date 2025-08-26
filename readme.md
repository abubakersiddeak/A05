### 6. Answer the following questions clearly:

1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?
2. How do you **create and insert a new element into the DOM**?
3. What is **Event Bubbling** and how does it work?
4. What is **Event Delegation** in JavaScript? Why is it useful?
5. What is the difference between **preventDefault() and stopPropagation()** methods?

---

ANS :
1.getElementById : একটি নির্দিষ্ট id বিশিষ্ট এলিমেন্ট খুঁজে বের করে।
getElementsByClassName : নির্দিষ্ট class বিশিষ্টএর সব এলিমেন্ট খুঁজে বের করে ।
querySelector : DOM থেকে প্রথম ম্যাচ করা এলিমেন্ট খুঁজে বের করে ।
querySelectorAll : DOM থেকে সব ম্যাচ করা এলিমেন্ট খুঁজে বের করে।

2. const newDiv = document.createElement("div");

3. Event Bubbling হলো একটি প্রক্রিয়া যেখানে একটি DOM ইভেন্ট নিচের এলিমেন্ট থেকে উপরের এলিমেন্টের দিকে ধাপে ধাপে বুদ্বুদ এর মত হয়ে উঠে।
   যখন কোনো ইভেন্ট ঘটে (যেমন click),
   সেই ইভেন্ট প্রথমে target element-এ ট্রিগার হয়,
   তারপর ধীরে ধীরে parent elements-এর মধ্যে চলে যায় যতক্ষণ না root (document) পৌঁছে।

4. Event Delegation : Event Delegation হলো একটি technique যেখানে child elements এ সরাসরি event listener না বসিয়ে, তার parent element এ listener বসানো হয় এবং event bubbling ব্যবহার করে child element-এ ঘটানো event হ্যান্ডেল করা যায় ।

   প্রয়োজন ঃ
   ১- কম কোডে অনেক child handle করা যায়
   ২- Dynamic elements handle করা সহজ
   ৩- Memory efficient

5. preventDefault: উদ্দেশ্য কোনো ইভেন্টের ডিফল্ট আচরণ বন্ধ করা।
   stopPropagation: উদ্দেশ্য ইভেন্ট bubbling বা capturing থামানো।
