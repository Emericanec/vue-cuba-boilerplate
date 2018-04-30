<template>
    <form @submit.prevent="submit">
        <slot></slot>
    </form>
</template>

<script>
    export default {
        props: {
            entity: {
                type: String,
                required: true
            },
            setSubmitData: {
                type: Function
            }
        },
        data: () => ({
            form: [],
        }),
        methods: {
            submit() {
                this.beforeSubmit();
                this.$cuba.instance.commitEntity(this.entity, this.form);
            },
            beforeSubmit() {
                this.form = this.setSubmitData();
            },
        }
    }
</script>