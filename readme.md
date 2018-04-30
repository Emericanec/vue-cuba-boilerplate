Install:
-------
`npm install vue-cuba-boilerplate@0.1.0 ./ my-app`

Screenshots:
------------

![Login form](https://raw.github.com/Emericanec/vue-cuba-boilerplate/master/screenshots/login.png)

![Account](https://raw.github.com/Emericanec/vue-cuba-boilerplate/master/screenshots/account.png)


Usage simple form:
------------------
```$vue
import CubaForm from '../components/CubaForm.vue';
<template>
    <cuba-form entity="carservice$City" :setSubmitData="setSubmitData">
        <input v-model="name">
        <input v-model="code">
        <input type="submit"/>
    </cuba-form>
</template>

<script>
    export default {
        data: () => ({
            name: "",
            code: ""
        }),
        methods: {
            setSubmitData() {
                return {
                    name: this.name,
                    code: this.code
                }
            }
        },
        components: {
            CubaForm
        }
    }
</script>
```

Usage auto generation forms (alpha):
-----------------------------------

```$vue
<template>
    <cuba-auto-form entity="carservice$City" />
</template>

<script>
    import CubaAutoForm from '../components/CubaAutoForm.vue';

    export default {
        components: {
            CubaAutoForm
        }
    }
</script>

```