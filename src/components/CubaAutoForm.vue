<template>
    <cuba-form :entity="entity" :setSubmitData="setSubmitData">
        <div v-for="input in inputs">
            {{input.placeholder}}: <input v-model="form[input.name]" :placeholder="input.placeholder" :type="input.type">
            <br>
        </div>
        <input type="submit"/>
    </cuba-form>
</template>

<script>
    import CubaForm from './CubaForm.vue';
    export default {
        props: {
            entity: {
                type: String,
                required: true
            },
        },
        data: () => ({
            form: {},
            inputs: []
        }),
        created() {
            this.$cuba.instance.loadEntityMetadata(this.entity).then((response) => {
                if(response.hasOwnProperty('properties')) {
                    this.generateForm(response.properties);
                }
            });
        },
        methods: {
            setSubmitData() {
                console.log(this.form);
                return this.form;
            },
            generateForm(properties) {
                const systemInputs = ['updatedBy', 'createdBy', 'createTs', 'version', 'updateTs', 'deletedBy', 'id'];
                const types = {
                    string: 'string',
                    boolean: 'checkbox'
                };
                properties.reduce((previousValue, currentValue) => {
                    if(!systemInputs.includes(currentValue.name)) {

                        const input = {
                            name: currentValue.name,
                            placeholder: currentValue.description,
                            type: types[currentValue.type]
                        };
                        this.inputs.push(input);
                    }
                });
            }
        },
        components: {
            CubaForm
        }
    }
</script>