import React from "react";
import {
  List,
  Responsive,
  SimpleList,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Create,
  Edit,
  SimpleForm,
  TextInput,
  Filter,
  Show,
  SimpleShowLayout
} from "react-admin";

const validateChurchCreation = (values: any) => {
  const errors: any = {};
  if (!values.name) {
    errors.name = ["The name is required"];
  }
  if (!/.+,.+,.+/.test(values.name || "")) {
    errors.name = ['The name should be in format "church name, city, country"'];
  }
  return errors;
};

const ChurchFilter = (props: any) => (
  <Filter {...props}>
    <TextInput label="Search" source="name" alwaysOn />
  </Filter>
);

export const ChurchList = (props: any) => (
  <List filters={<ChurchFilter />} {...props}>
    <Responsive
      small={
        <SimpleList
          primaryText={(record: any) => record.name}
          secondaryText={(record: any) =>
            `Created: ${Date.parse(record.createdAt).toLocaleString()}`
          }
          tertiaryText={() => ""}
        />
      }
      medium={
        <Datagrid>
          <TextField source="name" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
          <EditButton />
        </Datagrid>
      }
    />
  </List>
);

export const ChurchCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm validate={validateChurchCreation} redirect="show">
      <TextInput source="name" />
    </SimpleForm>
  </Create>
);

const ChurchEditTitle = ({ record }: { [key: string]: any }) => (
  <span>Church: {record.name}</span>
);

export const ChurchEdit = (props: any) => (
  <Edit title={<ChurchEditTitle />} {...props}>
    <SimpleForm validate={validateChurchCreation} redirect="show">
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);

export const ChurchShow = (props: any) => (
  <Show title={<ChurchEditTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
