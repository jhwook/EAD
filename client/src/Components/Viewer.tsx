import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';

const test = `# markdown`;

export default function PostView() {
  return <Viewer initialValue={test} />;
}
