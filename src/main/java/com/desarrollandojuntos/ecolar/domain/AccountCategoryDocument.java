/**
 * 
 */
package com.desarrollandojuntos.ecolar.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * @author ivangsa
 *
 */
@Document(collection = "account_category")
public class AccountCategoryDocument  implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;
    
    @Field("username")
    private String username;
    
    @Field("categories")
    private Set<AccountCategory> categories = new HashSet<>();
    
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    
    public String getUsername() {
		return username;
	}
	public AccountCategoryDocument username(String username) {
		this.username = username;
		return this;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public Set<AccountCategory> getCategories() {
		return categories;
	}
    
	public AccountCategory findAccountCategory(String id) {
		AccountCategory match = null;
        for (AccountCategory category : this.getCategories()) {
        	match = category.findCategory(id);
			if(match != null) {
				break;
			}
		}
        return match;
	}
	
    public AccountCategoryDocument categories(Set<AccountCategory> accountCategories) {
        this.categories = accountCategories;
        return this;
    }

    public AccountCategoryDocument addCategories(AccountCategory accountCategory) {
        this.categories.add(accountCategory);
        return this;
    }

    public AccountCategoryDocument removeCategories(AccountCategory accountCategory) {
        this.categories.remove(accountCategory);
        return this;
    }
	public void setCategories(Set<AccountCategory> categories) {
		this.categories = categories;
	}

	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AccountCategory accountCategory = (AccountCategory) o;
        if (accountCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

}
