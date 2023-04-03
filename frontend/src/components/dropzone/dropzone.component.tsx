import axios from 'axios';
import classnames from 'classnames';
import { useState } from 'react';
import ReactDropzone from 'react-dropzone';

import dropzoneStyles from './dropzone.module.scss';
import { convertFileToBlob } from './utils';

export const Dropzone = (): JSX.Element => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const onDrop = async (acceptedFiles: File[]): Promise<void> => {
    const fd = new FormData();
    const files = await convertFileToBlob(acceptedFiles);
    if (!files) {
      return;
    }
    for (let i = 0; i < files.length; i += 1) {
      if (files[i]) {
        fd.append('files', files[i]?.blob as Blob, files[i]?.filename);
      }
    }
    setIsUploading(true);
    setProgress(0);
    axios
      .post('http://localhost:4000/api/upload', fd, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.total;
          if (!totalLength) {
            return;
          }
          const currentProgress = Math.round((progressEvent.loaded * 100) / totalLength);
          console.log(currentProgress);
          setProgress(currentProgress);
        },
      })
      .then((data) => {
        console.log(data);
        setProgress(0);
        setIsUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setProgress(0);
        setIsUploading(false);
      });
  };

  return (
    <div className={dropzoneStyles.modal}>
      <div className={dropzoneStyles.modal__body}>
        <div className={dropzoneStyles.modal__col}>
          <svg
            className={classnames(dropzoneStyles.modal__icon, dropzoneStyles['modal__icon--blue'])}
            viewBox="0 0 24 24"
            width="24px"
            height="24px"
            aria-hidden="true"
          >
            <g fill="none" stroke="hsl(223,90%,50%)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle
                className={dropzoneStyles['modal__icon-sdo69']}
                cx="12"
                cy="12"
                r="11"
                strokeDasharray="69.12 69.12"
              />
              <polyline
                className={dropzoneStyles['modal__icon-sdo14']}
                points="7 12 12 7 17 12"
                strokeDasharray="14.2 14.2"
              />
              <line
                className={dropzoneStyles['modal__icon-sdo10']}
                x1="12"
                y1="7"
                x2="12"
                y2="17"
                strokeDasharray="10 10"
              />
            </g>
          </svg>
        </div>

        <div className={dropzoneStyles.modal__col}>
          <ReactDropzone onDrop={onDrop}>
            {({ getRootProps, getInputProps }): JSX.Element => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                Click me to upload a file!
              </div>
            )}
          </ReactDropzone>
          {isUploading ? <p>Uploading {progress}%</p> : null}
        </div>
      </div>
    </div>
  );
};
