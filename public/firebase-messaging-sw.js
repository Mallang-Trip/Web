self.addEventListener("push", (e) => {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const tag = e.data.json().data.tag;

  const isImageChat =
    resultData.body.startsWith(
      "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com"
    ) && tag.startsWith("/talk?chatRoomId");

  const notificationTitle = resultData.title;
  const notificationOptions = {
    ...resultData,
    body: isImageChat ? "사진을 전송하였습니다." : resultData.body,
    icon: "https://mallang-trip-db.s3.ap-northeast-2.amazonaws.com/profile/ae54463f-1299-4caa-b763-a94f5b300e27mallangtrip.png",
    image: isImageChat && resultData.body,
    tag: tag,
  };

  e.waitUntil(
    clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList) => {
        const isVisible = clientList.some((client) => {
          return (
            client.visibilityState === "visible" &&
            client.url.indexOf("/talk") > 0
          );
        });

        if (!isVisible) {
          return self.registration.showNotification(
            notificationTitle,
            notificationOptions
          );
        }
      })
  );
});

self.addEventListener("notificationclick", (e) => {
  const domain = e.currentTarget.serviceWorker.scriptURL.replace(
    "/firebase-messaging-sw.js",
    ""
  );
  const url = e.notification.tag || "/notify";
  e.notification.close();

  e.waitUntil(
    clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((clientList) => {
        const matchingClient = clientList.find((client) => {
          return client.url.startsWith(domain);
        });

        if (matchingClient) {
          matchingClient.focus();
          matchingClient.postMessage({
            action: "navigate",
            url: domain + url,
          });
        } else clients.openWindow(url);
      })
  );
});
