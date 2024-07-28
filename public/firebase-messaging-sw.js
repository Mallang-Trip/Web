self.addEventListener("push", (e) => {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const tag = e.data.json().data.tag;

  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/ae54463f-1299-4caa-b763-a94f5b300e27mallangtrip.png",
    image:
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/9a360955-8f22-4911-9708-53b1065f9b5amallangtrip.png",
    tag: tag,
    ...resultData,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", (e) => {
  const url = e.notification.tag || "/notify";
  e.notification.close();
  e.waitUntil(clients.openWindow(url));
});
