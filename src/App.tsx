import React from "react";
import {
  Admin,
  Resource,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY
} from "react-admin";

import { UserList, UserEdit, UserShow } from "./resources/users";
import {
  ChurchList,
  ChurchCreate,
  ChurchEdit,
  ChurchShow
} from "./resources/churches";
import { PostEdit, PostCreate, PostList, PostShow } from "./resources/posts";
import {
  UploadEdit,
  UploadCreate,
  UploadList,
  UploadShow
} from "./resources/uploads";
import {
  NotificationEdit,
  NotificationCreate,
  NotificationList,
  NotificationShow
} from "./resources/notifications";

import Dashboard from "./components/screens/Dashboard";
import GoogleLogin from "./components/screens/GoogleLogin";

import {
  createFeathersAuthProvider,
  createFeathersClient,
  createFeathersDataProvider
} from "ra-feathersjs-oauth";

import PostIcon from "@material-ui/icons/Send";
import UserIcon from "@material-ui/icons/Group";
import ChurchIcon from "@material-ui/icons/Add";
import NotificationIcon from "@material-ui/icons/Notifications";
import UploadIcon from "@material-ui/icons/CloudUpload";

const apiUrl = "https://united-church-api.herokuapp.com";

// make the config progressively adaptible
const feathersClient = createFeathersClient(apiUrl, {
  storageKey: "united-church-demo"
});

const dataProvider = createFeathersDataProvider(feathersClient, {
  uploadsUrl: `${apiUrl}/uploads`,
  multerFieldNameSetting: "files",
  resourceUploadsForeignKeyMap: { posts: "_id", uploads: "url" },
  resourceUploadableFieldMap: { posts: "relatedUpload", uploads: "url" },
  defaultPrimaryKeyField: "_id",
  CREATE,
  DELETE,
  DELETE_MANY,
  GET_LIST,
  GET_MANY,
  GET_MANY_REFERENCE,
  GET_ONE,
  UPDATE,
  UPDATE_MANY
});
const authProvider = createFeathersAuthProvider(feathersClient, {
  permissionsField: "permissions",
  oauthStrategy: "google",
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS,
  AUTH_LOGIN,
  AUTH_LOGOUT
});

const App: React.FC = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      authProvider={authProvider}
      dashboard={Dashboard}
      loginPage={GoogleLogin}
    >
      <Resource
        name="users"
        list={UserList}
        edit={UserEdit}
        show={UserShow}
        icon={UserIcon}
      />
      <Resource
        name="churches"
        list={ChurchList}
        edit={ChurchEdit}
        create={ChurchCreate}
        show={ChurchShow}
        icon={ChurchIcon}
      />
      <Resource
        name="notifications"
        list={NotificationList}
        create={NotificationCreate}
        edit={NotificationEdit}
        show={NotificationShow}
        icon={NotificationIcon}
      />
      <Resource
        name="uploads"
        list={UploadList}
        create={UploadCreate}
        edit={UploadEdit}
        show={UploadShow}
        icon={UploadIcon}
      />
      <Resource
        name="posts"
        list={PostList}
        create={PostCreate}
        edit={PostEdit}
        show={PostShow}
        icon={PostIcon}
      />
    </Admin>
  );
};

export default App;
