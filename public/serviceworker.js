const subs = {
  user: null,
  subscript: null,
  broadcast: new BroadcastChannel("noti-channel"),
  // url: "https://good-enormous-albertosaurus.glitch.me/",
  url: "http://localhost:3000/",
  get: async (user) => {
    // console.log(subs.subscript);
    const response = await fetch(`${subs.url}subscript/notification/${user}`, {
      method: "get",
      headers: { "Content-type": "application/json" },
    });
    return response.json();
  },
  set: async (user) => {
    // console.log(subs.subscript);
    const response = await fetch(`${subs.url}subscript/notification/${user}`, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subs.subscript),
    });

    return response.json();
  },
  unset: async (user) => {
    const response = await fetch(`${subs.url}subscript/notification/${user}`, {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(subs.subscript),
    });

    return response.json();
  },
  urlBase64ToUint8Array: (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  },
};
// let db = null
const IDB = {
  db: null,

  getDb: async (name, rows) => {
    return new Promise((resolve, reject) => {
      let request = self.indexedDB.open(name, 1);

      request.onerror = (e) => {
        console.log("Error opening db", e);
        reject("Error");
      };

      request.onsuccess = (e) => {
        resolve(e.target.result);
      };

      request.onupgradeneeded = (e) => {
        let db = e.target.result;
        rows.forEach((v, i) => {
          let objectStore = db.createObjectStore(v, {
            autoIncrement: true,
            keyPath: "id",
          });
        });
      };
    });
  },
  addValue: async (name, obj) => {
    console.log("about to add " + JSON.stringify(obj));
    await IDB.addValueToDb(name, obj);
    // await IDB.getValuesFromDb(name);
  },
  addValueToDb: async (name, obj) => {
    return new Promise((resolve, reject) => {
      let trans = IDB.db.transaction([name], "readwrite");
      trans.oncomplete = (e) => {
        resolve();
      };
      // console.log(obj)
      let store = trans.objectStore(name);
      store.add(obj);
    });
  },
  clearValueFromDb: async (name) => {
    return new Promise((resolve, reject) => {
      let trans = IDB.db.transaction([name], "readwrite");
      trans.oncomplete = (e) => {
        resolve();
      };

      let store = trans.objectStore(name);
      store.clear();
    });
  },
};
subs.broadcast.onmessage = async (event) => {
  // console.log(event.data.user);
  // let user = event.data.user
  let user = JSON.parse(event.data.user);
  // console.log(user);
  let response = null;
  if (event.data && event.data.type === "checknoti") {
    response = await subs.get(user.code);
    IDB.db = await IDB.getDb("UBIS", [
      `${user.code}-noti`,
      `${user.code}-news`,
    ]);
    subs.user = response.nt ? user : null;
  }
  if (event.data && event.data.type === "notification") {
    response = await subs.set(user.code);
    subs.user = response.nt ? user : null;
  }
  if (event.data && event.data.type === "unnotification") {
    response = await subs.unset(user.code);
    subs.user = response.status ? null : user;
  }
  return subs.broadcast.postMessage({
    type: "subscription",
    payload: response.nt,
  });
};
self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
});
console.log(self);
self.addEventListener("install", (e) => {
  console.log(e.type);
  self.skipWaiting(); // always activate updated SW immediately
});

self.addEventListener("activate", async (e) => {
  subs.subscript = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: subs.urlBase64ToUint8Array(
      "BMIGwA1dK5tl3oIlSwdq-3MChM-nuZ8TInMsC9E1S5AoLdHjFOVvCNxdvcOkWzhxpAMByC1AZ3oS3G8zC3MGaHo"
    ),
  });
  // self.registration.pushManager
  //   .getSubscription()
  //   .then((subscript) => {
  //     let bc = new BroadcastChannel("noti-channel");
  //     bc.postMessage({ payload: subscript ? true : false });
  //   })
  //   .catch((err) => {
  //     console.error(`Error during getSubscription(): ${err}`);
  //   });
});

self.addEventListener("push", async (e) => {
  console.log(subs.user)
  console.log(e.data.text())
  if (!subs.user) return;
  let text = e.data.text();
  let obj = JSON.parse(text);
  console.log(obj);

  console.error(subs.user);
  console.error(subs.user.access);
  // console.error(subs.user.access[obj._menu][obj._id])
  if (!subs.user.access) return;
  if (
    !subs.user.access[obj._menu] ||
    subs.user.access[obj._menu] == "undefined"
  )
    return;
  if (
    !subs.user.access[obj._menu][obj._id] ||
    subs.user.access[obj._menu][obj._id] == "undefined"
  )
    return;
  if (subs.user.access[obj._menu][obj._id] == "none") return;
  // await IDB.getValuesFromDb(`${subs.user.code}-noti`);
  // await IDB.getValuesFromDb(`${subs.user.code}-news`);
  await IDB.addValue(`${subs.user.code}-noti`, obj);
  await IDB.clearValueFromDb(`${subs.user.code}-news`);
  await IDB.addValue(`${subs.user.code}-news`, { status: true });
  subs.broadcast.postMessage({ type: "new", payload: e.data.text() });

  self.registration.showNotification(obj.title, {
    // body: e.data.text(),
    body: obj.body,

    // options : {
    tag: `${obj._id}${obj.code}`,
    actions: [
      {
        action: "detail",
        type: "button",
        title: "ดูการแจ้งเตือน",
        // icon:'./kay/rewrite_demo/services/api/controllers/MYSQL/INTERNAL/Global/image?path=web/ubis-logo.png&s=100',
        // icon:'http://localhost:8080/kay/rewrite_demo/services/api/controllers/MYSQL/INTERNAL/Global/image?path=web/ubis-logo.png&s=50',
      },
      // {
      //   action: 'coffee-action',
      //   title: 'testsetestestes',
      //   type: 'button',

      // },
      // {
      //   action: 'doughnut-action',
      //   type: 'button',
      //   title: 'Doughnut',
      //   icon: '/images/demos/action-2-128x128.png',
      // },
      // {
      //   action: 'gramophone-action',
      //   type: 'button',
      //   title: 'Gramophone',
      //   icon: '/images/demos/action-3-128x128.png',
      // },
    ],
    //  data:'dasdasdasdas',
    // },
    // badge: "https://internal.ubisasia.com/asset/favicon-ubis.jpg",
    // icon: "https://internal.ubisasia.com/asset/favicon-ubis.jpg",
    icon: "./kay/rewrite_demo/services/api/controllers/MYSQL/INTERNAL/Global/image?path=web/ubis-logo.png&s=50",
    // image: "https://internal.ubisasia.com/asset/favicon-ubis.jpg",
  });
  console.error(obj.link);
  self.addEventListener(
    "notificationclick",
    (event) => {
      event.notification.close();
      // if (event.action === "archive") {
      //   // User selected the Archive action.
      //   clients.openWindow("/inbox22222");
      // } else {
      // User selected (e.g., clicked in) the main body of notification.
      clients.openWindow(obj.link);
      // }
    },
    false
  );
  // self.onnotificationclick = (event) => {

  //   console.log("On notification click: ", event.notification.tag);
  //   event.notification.close();

  //   // This looks to see if the current is already open and
  //   // focuses if it is
  //   event.waitUntil(
  //     clients
  //       .matchAll({
  //         type: "window",
  //       })
  //       .then((clientList) => {
  //         for (const client of clientList) {
  //           if (client.url === "/" && "focus" in client) return client.focus();
  //         }
  //         if (clients.openWindow) return clients.openWindow("/");
  //       }),
  //   );
  // };
  // notification.onClick = ()=>{
  //   window.location.href = "https://google.com/"
  // }
});
