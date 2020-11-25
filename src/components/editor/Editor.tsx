import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Container } from 'reactstrap';
import 'react-quill/dist/quill.snow.css';
import { EditorProps } from './Editor.d';
import EditorCardCustom from './EditorCardCustom';

const defaultConfig = {
  format: ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'color'],
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['clean'],
      [{ color: [] }]
    ]
  }
};

const Editor: React.FC<EditorProps> = ({ content, format = defaultConfig.format, modules = defaultConfig.modules }) => {
  const [contentState, setContent] = useState<string>(content);
  return (
    <Container>
      <EditorCardCustom>
        <ReactQuill
          theme="snow"
          value={contentState}
          onChange={setContent}
          modules={modules}
          formats={format}
          style={{
            minHeight: '480px'
          }}
        />
      </EditorCardCustom>
      <br />
      <div
        key="editor"
        className="quill-contents border_solid_top"
        dangerouslySetInnerHTML={{ __html: contentState }}
      />
    </Container>
  );
};

export default Editor;
