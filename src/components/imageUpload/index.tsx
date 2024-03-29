import React, { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import { ImageUploadProps } from './type.ts';

const ImageUpload: React.FC<ImageUploadProps> = ({ fileList, onChange }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleCancelPreview = (): void => setPreviewVisible(false);

  const handlePreview = async (file: UploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      const preview = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj!);
        reader.onloadend = (): void => {
          resolve(reader.result as string);
        };
      });
      file.preview = preview;
    }
    setPreviewImage(file.url || file.preview || '');
    setPreviewVisible(true);
  };

  const handleChange = (info: UploadChangeParam<UploadFile>): void => {
    onChange(info.fileList.filter((file) => file.originFileObj));
  };

  return (
    <>
      <Upload
        listType="picture-card"
        accept="image/*"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 6 ? null : (
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
        <img alt="Preview" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
