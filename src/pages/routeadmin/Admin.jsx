import React from 'react'
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/admin/home/Home";
import List from "../../pages/admin/user/list/List";
import Single from "../../pages/admin/user/single/Single";
import New from "../../pages/admin/user/new/New";
import Edit from "../../pages/admin/user/edit/edit";

import Flows from "../../pages/admin/flows/flows/flows";
import Flowsub from "../../pages/admin/flows/flowsub/flowsub";
import Flowdetail from "../../pages/admin/flows/flowdetial/flowdetail";
import { productInputs, userInputs } from "../../formSource";
import GroupProfileAll from "../../pages/admin/menuprofile/groupProfileAll";
import Typedocument from '../admin/typedocument/typedocument';
import Positions from '../admin/positions/positions';
import Setemail from '../admin/setemail/setemail';
import Department from '../admin/department/department';
function Admin() {
  return (
    <Routes>
      <Route index element={<Home />} />

      <Route path="users">
        <Route index element={<List />} />
        <Route path=":id" element={<Single />} />
        <Route
          path="new"
          element={<New inputs={userInputs} title="Add New User" />}
        />
        <Route
          path="edit/:id"
          element={<Edit title="Edit New User" />}
        />
      </Route>

      <Route path="groupprofile">
        <Route index element={<GroupProfileAll />} />
        <Route path=":productId" element={<Single />} />
        <Route
          path="new"
          element={<New inputs={productInputs} title="Add New Product" />}
        />
      </Route>

      <Route path='typedocument'>
        <Route index element={<Typedocument />} />
      </Route>

      <Route path='positions'>
        <Route index element={<Positions />} />
      </Route>

      <Route path='department'>
        <Route index element={<Department />} />
      </Route>

      <Route path="flow">
        <Route index element={<Flows />} />
        <Route path="flowsub/:id" element={<Flowsub />} />
        <Route path="flowdetail/:id" element={<Flowdetail />} />
      </Route>

      <Route path="setemail">
        <Route index element={<Setemail />} />
      </Route>

    </Routes>
  )
}

export default Admin