import { UploadFile } from 'antd/lib/upload/interface';

export interface ImageUploadProps {
  fileList: UploadFile[];
  onChange: (fileList: UploadFile[]) => void;
}
