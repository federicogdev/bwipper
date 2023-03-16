import React, { FC, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface IImageDropzoneProps {
  onChange: (base64: string) => void;
  label: string;
  value?: string;
  disabled?: boolean;
}

const ImageDropzone: FC<IImageDropzoneProps> = ({
  onChange,
  label,
  value,
  disabled,
}) => {
  const [base64, setBase64] = useState(value);

  const handleChange = useCallback(
    (base64: string) => {
      //onChange takes an image (string) and  calls the setImage in parent component
      onChange(base64);
    },
    [onChange]
  );

  const handleDropzone = useCallback(
    (files: any) => {
      //we only have one file so file[0]
      const file = files[0];
      // initiate FileReader()
      const reader = new FileReader();

      reader.onload = (event: any) => {
        //once the image loads setBase64 to event.target.result
        setBase64(event.target.result);
        //once the image loads calls handleChange that call setImage in the parent component

        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDropzone,
    disabled: disabled,
    accept: { "image/jpeg": [], "image/png": [] },
  });

  return (
    <div
      {...getRootProps({
        className:
          "w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700 cursor-pointer",
      })}
    >
      <input {...getInputProps()} />
      {base64 ? (
        <div className="flex items-center justify-center">
          <Image src={base64} height="100" width="100" alt="Uploaded image" />
        </div>
      ) : (
        <p className="text-white">{label}</p>
      )}
    </div>
  );
};

export default ImageDropzone;
