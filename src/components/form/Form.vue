<template>
  <div class="row justify-content-center">
    <div class="col-xs-12 col-sm-10 col-md-6">
    <h1 class="text-center">{{title}}</h1>
    <form v-if="!isSubmitted" @submit.prevent="submit" novalidate>
      <div class="form-group">
        <label for="secretText">{{ $t('form.secretText') }}</label>
        <textarea 
          type="secretText" 
          class="form-control" 
          id="secretText" 
          v-model.trim="form.secretText" 
          v-bind:class="getFieldClasses('secretText')" 
          v-bind:maxlength="$v.form['secretText'].$params.maxLength.max" 
          @blur="onFieldBlur('secretText')">
        </textarea>
        <small class="text-muted form-text">{{ $tc('form.charactersLeft', getCharactersLeft('secretText'), { charCount: getCharactersLeft('secretText') }) }}</small>
        <div v-if="isErrorField('secretText')" class="invalid-feedback">{{ $t('error.fieldMaxLength', { field: $t('form.secretText') }) }}</div>
      </div>
      <div class="form-group">
        <label for="expireAfterViews">{{ $t('form.expireAfterViews') }} *</label>
        <input type="text" class="form-control" id="expireAfterViews" v-model.lazy.trim="form.expireAfterViews" @blur="onFieldBlur('expireAfterViews')" v-bind:class="getFieldClasses('expireAfterViews')">
        <div v-if="isErrorField('expireAfterViews')" class="invalid-feedback">{{ $t('error.fieldRequired', { field: $t('form.expireAfterViews') }) }}</div>
      </div>
      <div class="form-group">
        <label for="expireAfter">{{ $t('form.expireAfter') }} *</label>
        <input type="expireAfter" class="form-control" id="expireAfter" v-model.lazy.trim="form.expireAfter" @blur="onFieldBlur('expireAfter')" v-bind:class="getFieldClasses('expireAfter')">
        <div v-if="isErrorField('expireAfter')" class="invalid-feedback">{{ $t('error.fieldInvalid', { field: $t('form.expireAfter') }) }}</div>
      </div>

      <div class="alert alert-danger" v-if="isError">
        <p class="mb-0">
          <strong>{{ $t(errorHeader) }}</strong>
        </p>
        <ul class="mb-0 pl-3" v-if="errors.length > 0">
          <li v-for="error in errors" v-bind:key="error.field">
            <span v-if="error.field">{{ $t('form.'+error.field) }}<span v-if="error.message">: {{ $t(error.message) }}</span></span>
            <span v-else-if="error.message">{{ $t(error.message) }}</span>
          </li>
        </ul>
      </div>
      <div class="form-group">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          <span v-if="submitting">{{ $t('form.submitting' ) }} <img src="../../assets/loader.svg" /></span>
          <span v-else>{{ $t('form.submit' ) }}</span>
        </button>
      </div>
    </form>
    <div v-else>
      <div class="alert alert-success">
        <strong>{{ $t('form.submitted' ) }}</strong>
      </div>
      <div class="alert alert-info">
        <p><strong>{{ $t('form.sentInfo' ) }}</strong></p>
        <pre>
            {{ result }}
        </pre>
      </div>

      <div class="datablock">
            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Your secret here</h6>
                        <small class="text-muted">
                          <router-link :to="linkToSecret" class="btn btn-secondary">{{ result.hash }}</router-link>
                        </small>
                    </div>
                </li>
            </ul>
        </div> <!-- datablock -->

      <p class="text-center">
        <a href="#" class="btn btn-secondary" @click.prevent="reload()">{{ $t('form.return' ) }}</a>
      </p>
    </div>
    </div>
  </div>
</template>

<script src="./Form.js"></script>
<style src="./Form.scss" lang="scss" scoped></style>
