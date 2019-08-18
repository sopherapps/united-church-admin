import React from "react";
import Chip from "@material-ui/core/Chip";
import {
  List,
  Datagrid,
  TextField,
  ImageField,
  FunctionField,
  DateField,
  ReferenceField,
  EditButton,
  Edit,
  SimpleForm,
  ReferenceInput,
  DisabledInput,
  AutocompleteInput,
  SelectArrayInput,
  Show,
  SimpleShowLayout
} from "react-admin";

const permissions = ["member", "moderator", "admin"].map(role => ({
  id: role,
  name: role
}));

export const UserList = (props: any) => (
  <List {...props}>
    <Datagrid>
      <FunctionField
        source="permissions"
        render={(record: any) =>
          record.permissions.map((permission: any, index: number) => (
            <Chip label={permission} key={index} />
          ))
        }
      />
      <ReferenceField source="church" reference="churches">
        <TextField source="name" />
      </ReferenceField>

      <ImageField source="photo" title="name" />
      <TextField source="name" />
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record, view = "edit" }: { [key: string]: any }) => (
  <span>
    {view === "edit" ? "Edit" : ""} User: {record.name}
  </span>
);

export const UserEdit = (props: any) => (
  <Edit title={<UserTitle view="edit" />} {...props}>
    <SimpleForm>
      <DisabledInput source="name" />
      <ReferenceInput source="church" reference="churches">
        <AutocompleteInput optionText="name" optionValue="id" />
      </ReferenceInput>
      <SelectArrayInput source="permissions" choices={permissions} />
    </SimpleForm>
  </Edit>
);

export const UserShow = (props: any) => (
  <Show title={<UserTitle view="show" />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ImageField source="photo" title="name" />
      <FunctionField
        source="permissions"
        render={(record: any) =>
          record.permissions.map((permission: any, index: number) => (
            <Chip label={permission} key={index} />
          ))
        }
      />
      <ReferenceField source="church" reference="churches">
        <TextField source="name" />
      </ReferenceField>
      <DateField source="createdAt" />
      <DateField source="updatedAt" />
    </SimpleShowLayout>
  </Show>
);
