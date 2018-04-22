<template>
    <div>
        ID: {{user.id}}<br>
        Email: {{user.email}}<br>
        Name: {{user.name}}<br>
        Position: {{user.position}}<br>
    </div>
</template>

<script>
    export default {
        computed: {
            user() {
                return this.$store.getters.getUserInfo;
            }
        },
    }
</script>