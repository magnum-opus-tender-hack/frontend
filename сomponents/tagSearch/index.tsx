import React from 'react';
import 'antd/dist/antd.css';
import { Select, Tag  } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';



const tagRender = (props: CustomTagProps) => {
    const { label, value,  closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={label?.toString()}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {value}
      </Tag>
    );
  };


const options = [{ value: "мяч", label: "gold" }, {value:"шайба", label: 'lime' }, {value:"бумага", label: 'green' }, { value:"карандаш", label: 'cyan' }];


const handleChange = (value: string) => {
  console.log(value);
};

export const TagSearch: React.FC<{onData:(data:any)=>void}> = (props) =>{
    
    return(
      <Select 
      tagRender={tagRender}
      mode="tags"
      style={{ width: '100%' }}
      onChange={handleChange}
      tokenSeparators={[' ', ',']}
      options={options}
      >
      </Select>
    );
}
