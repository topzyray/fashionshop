"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import TileComponent from "@/components/FormElements/TileComponent";
import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import { GlobalContext } from "@/context/global-context";
import { adminAddProductFormControls, availableSizes } from "@/utils";
import { useContext, useState } from "react";
import { IoIosImages } from "react-icons/io";
import { app, firebaseStorageUrl } from "@/firebase/index";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

interface File {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
}

const createUniqueFileName = (getFile: File) => {
  const timestamp = Date.now();
  const randomStringValue = Math.random().toString(36).substring(2, 12);
  return `${getFile.name}-${timestamp}-${randomStringValue}`;
};

const helperForUploadingImageToFirebase = async (file: File) => {
  const storage = getStorage(app, firebaseStorageUrl);

  const getFileName = createUniqueFileName(file);
  const storageReference = ref(storage, `fashionshop/${getFileName}`);
  const uploadImage = await uploadBytesResumable(storageReference, file);

  return new Promise((resolve, reject) => {
    uploadImage.task.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadImage.ref)
          .then((downloadURL) => resolve(downloadURL))
          .catch((error) => reject(error));
      }
    );
  });
};

const initialFormData = {
  name: "",
  description: "",
  price: 0,
  category: "",
  sizes: [],
  // sizes: [] as { id: string; label: string }[],
  deliveryInfo: "",
  onSale: "",
  priceDrop: 0,
  imageUrl: "",
};

export default function AdminAddNewProduc() {
  const [formData, setFormData] = useState(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const [fileName, setFileName] = useState("");
  const handleImageUpload = async (e) => {
    setFileName(e.target.files[0].name);
    const extractImageUrl = await helperForUploadingImageToFirebase(
      e.target.files[0]
    );
    console.log(extractImageUrl);
    if (
      extractImageUrl !== "" ||
      extractImageUrl !== undefined ||
      extractImageUrl !== null
    ) {
      setFormData({
        ...formData,
        imageUrl: extractImageUrl,
      });
    }
  };

  const handleTileClick = (getCurrentItem: { id: string; label: string }) => {
    let copySizes = [...formData.sizes];
    const index = copySizes.findIndex(
      (item: { id: string; label: string }) => item.id === getCurrentItem.id
    );

    if (index === -1) {
      copySizes.push(getCurrentItem);
    } else {
      copySizes = copySizes.filter(
        (item: { id: string; label: string }) => item.id !== getCurrentItem.id
      );
    }

    setFormData({
      ...formData,
      sizes: copySizes,
    });
  };

  console.log(formData);

  return (
    <div className="w-full mt-5 mr-0 mb-5 ml-0 px-5 relative">
      <div className="max-w-4xl flex flex-col items-center justify-start mx-auto p-5 sm:p-10 bg-white shadow-2xl rounded-xl relative">
        <p className="w-full text-2xl md:text-4xl font-medium text-center font-serif">
          Add New Product
        </p>
        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          <label className="inline-flex gap-1 items-center cursor-pointer hover:shadow transition-all ease-in-out duration-300">
            <IoIosImages className="text-4xl" />
            <span className="">{fileName ? fileName : "Choose File"}</span>
            <input
              type="file"
              accept="image/*"
              max="1000000"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>

          <div className="flex gap-2 flex-col">
            <label>Choose Available sizes</label>
            <TileComponent
              onClick={handleTileClick}
              data={availableSizes}
              selected={formData.sizes}
            />
          </div>

          {adminAddProductFormControls.map(
            ({ id, type, label, placeholder, componentType, options }) =>
              componentType === "input" ? (
                <InputComponent
                  key={id}
                  type={type}
                  placeholder={placeholder}
                  label={label}
                  value={formData[id as keyof typeof initialFormData]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [id]: e.target.value,
                    })
                  }
                />
              ) : componentType === "select" ? (
                <SelectComponent
                  key={id}
                  options={options}
                  label={label}
                  value={formData[id as keyof typeof initialFormData]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [id]: e.target.value,
                    })
                  }
                />
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
