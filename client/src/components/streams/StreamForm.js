import React from '../../../node_modules/react';
import { Field, reduxForm } from '../../../node_modules/redux-form/lib'
import streamsStyles from './streamsStyles.module.css'

class StreamForm extends React.Component {
    renderError({ error, touched}) {
        if(error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    
    //inherit all the properties of input (ex. value, and onChange events) -> destructure input property from forProps
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} /> 
                {this.renderError(meta)}
            </div>
        )
    }
    //refactor
    renderFileInput = ({ input, type, meta}) => {
        const mimeType = this.props;
        return (
            <div className={streamsStyles.thumbnailContainer}>
                <label>Thumbnail</label>
                <input 
                    name={input.name} 
                    type={type} 
                    accept={mimeType}
                    onChange={event => this.handleChange(event, input)}
                />
            </div>
        )
    }

    handleChange = (event, input) => {
        event.preventDefault();
        const reader = new FileReader();
        let imageFile = event.target.files[0];
        let fileAsB64 = [];

        if(imageFile) {
            reader.onload = () => {
                fileAsB64.push(reader.result.substr(reader.result.indexOf(",") + 1));
                imageFile.url = fileAsB64[0];
            }
            const localImageUrl = URL.createObjectURL(imageFile);
            const imageObj = new window.Image();
            imageObj.onload = () => {
                imageFile.width = imageObj.naturalWidth;
                imageFile.height = imageObj.naturalHeight;
                input.onChange(imageFile);
                URL.revokeObjectURL(imageFile);
              };
              imageObj.src = localImageUrl;
              reader.readAsDataURL(imageFile);
        }
    }

    onSubmit = (formProps) => {
        this.props.onSubmit(formProps);
    }

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Title"/>
                <Field name="description" component={this.renderInput} label="Description"/>
                <Field type="file" component={this.renderFileInput} name="image" label="Thumbnail" accept="image/*"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {} //hooked up ti render of the input title name
    if(!formValues.title) {
        errors.title = "You need to enter a valid title"
    }

    if(!formValues.description) {
        errors.description = "You need to enter a valid description"
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
