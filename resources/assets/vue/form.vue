<template>
	<div class="row">
        <form>
            <div class="input-group">
                <input v-model="postMessage"  class="form-control">
                <demo-grid data="{{userList}}" column="real_name" filter-key="{{postMessage}}" wait-for="data-loaded"></demo-grid>
                <span class="input-group-btn">
                    <input class="btn btn-success" type="submit" value="发送"  v-on="click : sendMessage;" >
                </span>
            </div>
        </form>
    </div>
</template>

<script>
	module.exports = {

	}
</script>