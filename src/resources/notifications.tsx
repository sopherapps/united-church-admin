import React from "react";
import {
  List,
  Responsive,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  ReferenceField,
  BooleanField,
  EditButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  AutocompleteInput,
  ReferenceInput,
  DisabledInput,
  Filter,
  Show,
  SimpleShowLayout
} from "react-admin";

const validateNotificationCreation = (values: any) => {
  const errors: any = {};
  if (!values.text) {
    errors.text = ["The text is required"];
  }
  return errors;
};

const notificationTypes = ["approved", "rejected", "new_post"].map(
  notificationType => ({ id: notificationType, name: notificationType })
);

const NotificationFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
    <ReferenceInput source="recipient" reference="users" allowEmpty>
      <AutocompleteInput optionText="name" optionValue="id" />
    </ReferenceInput>
    <ReferenceInput source="relatedPost" reference="posts" allowEmpty>
      <AutocompleteInput optionText="title" optionValue="id" />
    </ReferenceInput>
  </Filter>
);

export const NotificationList = (props: any) => (
  <List filters={<NotificationFilter />} {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={(record: any) => record.text}
          secondaryText={(record: any) => record.recipient}
          tertiaryText={(record: any) =>
            `Created: ${record.createdAt.toLocaleString().slice(0, 10)}`
          }
        />
      }
      medium={
        <Datagrid>
          <ReferenceField source="recipient" reference="users">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="relatedPost" reference="posts" allowEmpty>
            <TextField source="title" />
          </ReferenceField>
          <TextField source="text" />
          <TextField source="type" />
          <BooleanField source="seen" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export const NotificationCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm validate={validateNotificationCreation} redirect="show">
      <ReferenceInput source="recipient" reference="users">
        <AutocompleteInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <ReferenceInput source="relatedPost" reference="posts" allowEmpty>
        <AutocompleteInput optionText="title" optionValue="id" />
      </ReferenceInput>
      <SelectInput source="type" choices={notificationTypes} />
      <TextInput source="text" />
    </SimpleForm>
  </Create>
);

const NotificationEditTitle = ({ record }: { [key: string]: any }) => (
  <span>Edit Notification sent to user: {record.recipient}</span>
);

export const NotificationEdit = (props: any) => (
  <Edit title={<NotificationEditTitle />} {...props}>
    <SimpleForm validate={validateNotificationCreation} redirect="show">
      <ReferenceField source="recipient" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="relatedPost" reference="posts" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <DisabledInput source="type" />
      <TextInput source="text" />
    </SimpleForm>
  </Edit>
);

export const NotificationShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="type" />
      <BooleanField source="seen" />
      <ReferenceField source="recipient" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <ReferenceField source="relatedPost" reference="posts" allowEmpty>
        <TextField source="title" />
      </ReferenceField>
      <TextField source="text" />
      <ReferenceField source="last_modified_by" reference="users">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
