import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography } from '@mui/material';

const TextEditor = (params: any) => {
    return (
        <div>
            {params.noHelperLabel ? null : <Typography className='noted-text'>{params.label}</Typography>}
            <CKEditor
                editor={ ClassicEditor }
                data={params.data}
                onReady={ (editor: any) => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event: any, editor:any ) => {
                    const data = editor.getData();
                    // console.log( { event, editor, data } );
                    params.handleEditorData(data);
                } }
                onBlur={ ( event: any, editor: any ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event: any, editor: any ) => {
                    console.log( 'Focus.', editor );
                } }
            />
        </div>
    );
}
export default TextEditor;

