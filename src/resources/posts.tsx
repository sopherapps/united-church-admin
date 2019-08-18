import React from "react";
import {
  List,
  Responsive,
  SimpleList,
  Datagrid,
  ReferenceField,
  TextField,
  BooleanField,
  DateField,
  EditButton,
  Edit,
  FileField,
  SimpleForm,
  ReferenceInput,
  TextInput,
  SelectInput,
  FileInput,
  LongTextInput,
  BooleanInput,
  AutocompleteInput,
  Create,
  Filter,
  Show,
  SimpleShowLayout,
  UrlField
} from "react-admin";

import MediaPlayer from "../components/custom-fields/MediaPlayer";

const postTypes = ["audio", "video", "text"].map(postType => ({
  id: postType,
  name: postType
}));

const PostFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="title" alwaysOn />
    <ReferenceInput label="Author" source="author" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" optionValue="id" />
    </ReferenceInput>
    <ReferenceInput source="parentPost" reference="posts" allowEmpty>
      <AutocompleteInput optionText="title" />
    </ReferenceInput>
    <BooleanInput source="approved" allowEmpty />
    <SelectInput source="type" choices={postTypes} allowEmpty />
  </Filter>
);

export const PostList = (props: any) => (
  <List filters={<PostFilter />} {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={(record: any) => record.title}
          secondaryText={(record: any) => record.passage}
          tertiaryText={(record: any) => record.type}
        />
      }
      medium={
        <Datagrid>
          <TextField source="title" />
          <ReferenceField source="parentPost" reference="posts" allowEmpty>
            <TextField source="title" />
          </ReferenceField>
          <TextField source="passage" />
          <BooleanField source="approved" />
          <TextField source="type" />

          <UrlField source="mediaUrl" />
          <ReferenceField source="author" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="last_modified_by" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="relatedUpload" reference="uploads" allowEmpty>
            <UrlField source="url" />
          </ReferenceField>
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

const PostTitle = ({ record }: { [key: string]: any }) => (
  <span>Post {record ? `"${record.title}"` : ""}</span>
);

export const PostEdit = (props: any) => (
  <Edit title={<PostTitle />} {...props}>
    <SimpleForm redirect="show">
      <SelectInput source="type" choices={postTypes} />
      <ReferenceInput source="parentPost" reference="posts" allowEmpty>
        <SelectInput optionText="title" optionValue="id" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="passage" />
      <FileInput
        source="relatedUpload"
        label="Upload media"
        options={{ multiple: false, maxSize: 50000000 }} // ~50 mbs
        accept="audio/*,video/*"
        placeholder={<p>Drop your file here</p>}
      >
        <FileField source="src" title="title" />
      </FileInput>
      <MediaPlayer source="mediaUrl" />
      <ReferenceField source="relatedUpload" reference="uploads">
        <UrlField source="url" />
      </ReferenceField>
    </SimpleForm>
  </Edit>
);

export const PostCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm redirect="show">
      <SelectInput source="type" choices={postTypes} />
      <ReferenceInput source="parentPost" reference="posts">
        <SelectInput optionText="title" optionValue="id" />
      </ReferenceInput>
      <TextInput source="title" />
      <LongTextInput source="passage" />
      <FileInput
        source="relatedUpload"
        label="Upload media"
        options={{ multiple: false, maxSize: 50000000 }} // ~50 mbs
        accept="audio/*,video/*"
        placeholder={<p>Drop your file here</p>}
      >
        <FileField source="src" title="title" />
      </FileInput>
    </SimpleForm>
  </Create>
);

export const PostShow = (props: any) => (
  <Show title={<PostTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="passage" />
      <BooleanField source="approved" />
      <TextField source="type" />
      <ReferenceField source="parentPost" reference="posts" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <ReferenceField source="author" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="last_modified_by" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <MediaPlayer source="mediaUrl" />
      <ReferenceField source="relatedUpload" reference="uploads" allowEmpty>
        <UrlField source="url" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
