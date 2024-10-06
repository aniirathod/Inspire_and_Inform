import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import config from "../conf/config";

const RTE = ({ name, control, label, defaultValue = "" }) => {
  return (
    <>
      <div className="w-full pl-1">
        <>
          {label && (
            <label className="inline-block pl-1 mb-2 text-xl">{label}</label>
          )}

          <Controller
            name={name || "content"}
            control={control}
            render={({ field: { onChange } }) => (
              <Editor
                apiKey={config.tinyMce_Key}
                initialValue={defaultValue}
                init={{
                  height: 500,
                  menubar: true,
                  plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                  ],
                  toolbar:
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px}",
                }}
                onEditorChange={onChange}
              />
            )}
          />
        </>
      </div>
    </>
  );
};

export default RTE;
