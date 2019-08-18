import React from "react";
import {
  List,
  Responsive,
  SimpleList,
  Datagrid,
  FileField,
  DateField,
  ReferenceField,
  TextField,
  EditButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  Filter,
  FileInput,
  Show,
  SimpleShowLayout,
  UrlField
} from "react-admin";

import MediaPlayer from "../components/custom-fields/MediaPlayer";

const UploadFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="url" alwaysOn />
  </Filter>
);

export const UploadList = (props: any) => (
  <List filters={<UploadFilter />} {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={(record: any) => record.url}
          secondaryText={(record: any) => record.uploader}
          tertiaryText={(record: any) =>
            `Created: ${Date.parse(record.createdAt).toLocaleString()}`
          }
        />
      }
      medium={
        <Datagrid>
          <FileField source="url" title="url" />
          <ReferenceField source="uploader" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export const UploadCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <FileInput
        source="url"
        label="Upload audios or videos"
        options={{ multiple: true, maxSize: 50000000 }} // ~50 mbs
        accept="audio/*,video/*"
        placeholder={<p>Drop your file here</p>}
      >
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

const UploadTitle = ({ record }: { [key: string]: any }) => (
  <span>Url: {record.url}</span>
);

export const UploadEdit = (props: any) => (
  <Edit title={<UploadTitle />} {...props}>
    <SimpleForm redirect="show">
      <MediaPlayer source="url" />
      <UrlField source="url" />
      <ReferenceField label="Uploaded by:" source="uploader" reference="users">
        <TextField source="name" />
      </ReferenceField>
    </SimpleForm>
  </Edit>
);

export const UploadShow = (props: any) => (
  <Show title={<UploadTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <MediaPlayer source="url" />
      <UrlField source="url" />
      <ReferenceField label="Uploaded by:" source="uploader" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
