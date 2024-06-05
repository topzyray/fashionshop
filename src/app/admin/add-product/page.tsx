"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import { GlobalContext } from "@/context/global-context";
import { adminAddProductFormControls, availableSizes } from "@/utils";
import { useContext, useState } from "react";
import { IoIosImages } from "react-icons/io";

export default function AdminAddNewProduc() {
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const [fileName, setFileName] = useState("");
  const handleImageUpload = (e) => {
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0]);
  };

  return (
    <div className="w-full h-screen mt-5 mr-0 mb-0 ml-0 relative">
      <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative">
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <label className="inline-flex gap-1 items-center cursor-pointer hover:shadow transition-all ease-in-out duration-300">
            <IoIosImages className="text-xl" />
            <span className="">Choose File: {fileName}</span>
            <input
              type="file"
              accept="image/*"
              max="1000000"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <div className="flex gap-2 flex-col">
            <label>Available sizes</label>
            <TileComponent data={availableSizes} />
          </div>

          {adminAddProductFormControls.map(
            ({ id, type, label, placeholder, componentType, options }) =>
              componentType === "input" ? (
                <InputComponent
                  key={id}
                  type={type}
                  placeholder={placeholder}
                  label={label}
                />
              ) : componentType === "select" ? (
                <SelectComponent key={id} options={options} label={label} />
              ) : null
          )}
          <button className="btn-large">
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader
                text="Adding Product"
                color="#ffffff"
                loading={componentLevelLoader && componentLevelLoader.loading}
              />
            ) : (
              "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
